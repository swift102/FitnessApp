import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ActivityTracking, FitnessProgram } from 'src/model/fitness';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {
  private readonly ACTIVITY_HISTORY_KEY = 'activity_history';
  
  // Redefined fitness programs
  private fitnessPrograms: FitnessProgram[] = [
    {
      uid: 'p101',
      title: 'Fat Burn Fundamentals',
      category: 'Fat Loss',
      summary: 'Begin your weight loss journey with these foundational calorie-burning exercises.',
      coverImage: 'assets/3.jpg',
      timeFrame: 30,
      intensityLevel: 'Beginner',
      gear: ['None'],
      activityElements: [
        {
          uid: 'a201',
          title: 'Dynamic Jumps',
          timeFrame: 60,
          gear: [],
          steps: 'Begin with feet together, then jump with legs apart and arms raised overhead.'
        },
        {
          uid: 'a202',
          title: 'Floor Press',
          groupCount: 3,
          repetitions: 10,
          gear: ['None'],
          steps: 'Begin in plank stance, lower your body by bending arms, then press back up.',
          timeFrame: 0
        },
        {
          uid: 'a203',
          title: 'Hip Hinges',
          groupCount: 3,
          repetitions: 15,
          gear: ['None'],
          steps: 'Stand with feet shoulder-width apart, bend knees and push hips back as if sitting, then return to standing.',
          timeFrame: 0
        }
      ],
      workout: ''
    },
    {
      uid: 'p102',
      title: 'Strength Foundation',
      category: 'Muscle Building',
      summary: 'Develop muscle mass and strength with these fundamental resistance exercises.',
      coverImage: 'assets/2.png',
      timeFrame: 45,
      intensityLevel: 'Intermediate',
      gear: ['Bench', 'Bar', 'Plates'],
      activityElements: [
        {
          uid: 'a204',
          title: 'Chest Press',
          groupCount: 4,
          repetitions: 8,
          gear: ['Bench', 'Bar', 'Plates'],
          steps: 'Recline on bench, grip bar, lower to chest level, then press upward.',
          timeFrame: 0
        },
        {
          uid: 'a205',
          title: 'Hip Hinge Lifts',
          groupCount: 4,
          repetitions: 8,
          gear: ['Bar', 'Plates'],
          steps: 'Stand with feet hip-width apart, bend at hips to grip bar, lift by extending hips and knees.',
          timeFrame: 0
        },
        {
          uid: 'a206',
          title: 'Vertical Pulls',
          groupCount: 3,
          repetitions: 10,
          gear: ['Pull Bar'],
          steps: 'Hang from bar with palms forward, pull body up until chin clears bar, then lower back down.',
          timeFrame: 0
        }
      ],
      workout: ''
    },
    {
      uid: 'p103',
      title: 'Cardiovascular Rush',
      category: 'Endurance',
      summary: 'Elevate your heart rate and improve stamina with this high-energy routine.',
      coverImage: 'assets/CR.jpg',
      timeFrame: 30,
      intensityLevel: 'Intermediate',
      gear: ['None'],
      activityElements: [
        {
          uid: 'a207',
          title: 'Elevated Knees',
          timeFrame: 60,
          gear: ['None'],
          steps: 'Jog in place, bringing knees as high as comfortable.'
        },
        {
          uid: 'a208',
          title: 'Full-Body Press-Jump',
          timeFrame: 60,
          gear: ['None'],
          steps: 'Start standing, drop to floor, perform a press-up, jump feet toward hands, then leap upward.'
        },
        {
          uid: 'a209',
          title: 'Plank Runners',
          timeFrame: 60,
          gear: ['None'],
          steps: 'Begin in plank position, alternately bring knees toward chest in quick succession.'
        }
      ],
      workout: ''
    },
    {
      uid: 'p104',
      title: 'Mobility & Balance Flow',
      category: 'Flexibility',
      summary: 'Enhance joint mobility and mental calm with flowing movement patterns.',
      coverImage: 'assets/1.jpg',
      timeFrame: 40,
      intensityLevel: 'Beginner',
      gear: ['Exercise Mat'],
      activityElements: [
        {
          uid: 'a210',
          title: 'Inverted V Stretch',
          timeFrame: 60,
          gear: ['Exercise Mat'],
          steps: 'Begin on hands and knees, elevate hips upward and back to form a triangular shape.'
        },
        {
          uid: 'a211',
          title: 'Standing Extension',
          timeFrame: 60,
          gear: ['Exercise Mat'],
          steps: 'Step one foot backward, bend front knee, raise arms overhead while keeping back straight.'
        },
        {
          uid: 'a212',
          title: 'Restorative Rest',
          timeFrame: 60,
          gear: ['Exercise Mat'],
          steps: 'Kneel with knees apart, sit back on heels, stretch arms forward and rest forehead on mat.'
        }
      ],
      workout: ''
    }
  ];

  constructor() {}

  async retrieveAllPrograms(): Promise<FitnessProgram[]> {
    return this.fitnessPrograms;
  }

  async findProgramById(uid: string): Promise<FitnessProgram | undefined> {
    return this.fitnessPrograms.find(program => program.uid === uid);
  }

  async findProgramsByCategory(category: string): Promise<FitnessProgram[]> {
    return this.fitnessPrograms.filter(program => program.category === category);
  }

  async retrieveActivityHistory(userId: string): Promise<ActivityTracking[]> {
    try {
      const { value } = await Preferences.get({ key: this.ACTIVITY_HISTORY_KEY });
      const allActivityHistory: ActivityTracking[] = value ? JSON.parse(value) : [];
      return allActivityHistory.filter(record => record.userId === userId);
    } catch (error) {
      console.error('Failed to retrieve activity history:', error);
      return [];
    }
  }

  async recordActivity(programId: string, userId: string): Promise<boolean> {
    try {
      const { value } = await Preferences.get({ key: this.ACTIVITY_HISTORY_KEY });
      const activityHistory: ActivityTracking[] = value ? JSON.parse(value) : [];
      
      const newActivity: ActivityTracking = {
        programId,
        completionTime: new Date().toISOString(),
        userId,
        progress: ''
      };
      
      activityHistory.push(newActivity);
      await Preferences.set({
        key: this.ACTIVITY_HISTORY_KEY,
        value: JSON.stringify(activityHistory)
      });
      
      return true;
    } catch (error) {
      console.error('Failed to record activity:', error);
      return false;
    }
  }

  async clearHistory(userId: string): Promise<boolean> {
    try {
      const { value } = await Preferences.get({ key: this.ACTIVITY_HISTORY_KEY });
      let activityHistory: ActivityTracking[] = value ? JSON.parse(value) : [];
      
      // Remove all activities for this user
      activityHistory = activityHistory.filter(activity => activity.userId !== userId);
      
      await Preferences.set({
        key: this.ACTIVITY_HISTORY_KEY,
        value: JSON.stringify(activityHistory)
      });
      
      return true;
    } catch (error) {
      console.error('Failed to clear history:', error);
      return false;
    }
  }
}
