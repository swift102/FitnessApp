// src/app/services/workout.service.ts
import { Injectable } from '@angular/core';
import { Workout, Exercise } from 'src/model/fitness';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [
    {
      id: 'p101',
      title: 'Fat Burn Fundamentals',
      type: 'Fat Loss',
      description: 'Begin your weight loss journey with these foundational calorie-burning exercises.',
      imageUrl: 'assets/3.jpg',
      timeFrame: 30,
      intensityLevel: 'Beginner',
      gear: ['None'],
      exercises: [
        {
          id: 'a201',
          name: 'Dynamic Jumps',
          duration: 60,
          equipment: [],
          description: 'Begin with feet together, then jump with legs apart and arms raised overhead.'
        },
        {
          id: 'a202',
          name: 'Floor Press',
          sets: 3,
          reps: 10,
          equipment: ['None'],
          description: 'Begin in plank stance, lower your body by bending arms, then press back up.',
          duration: 0
        },
        {
          id: 'a203',
          name: 'Hip Hinges',
          sets: 3,
          reps: 15,
          equipment: ['None'],
          description: 'Stand with feet shoulder-width apart, bend knees and push hips back as if sitting, then return to standing.',
          duration: 0
        }
      ],
      duration: 0
    },
    {
      id: 'p102',
      title: 'Strength Foundation',
      type: 'Muscle Building',
      description: 'Develop muscle mass and strength with these fundamental resistance exercises.',
      imageUrl: 'assets/2.png',
      timeFrame: 45,
      intensityLevel: 'Intermediate',
      gear: ['Bench', 'Bar', 'Plates'],
      exercises: [
        {
          id: 'a204',
          name: 'Chest Press',
          sets: 4,
          reps: 8,
          equipment: ['Bench', 'Bar', 'Plates'],
          description: 'Recline on bench, grip bar, lower to chest level, then press upward.',
          duration: 0
        },
        {
          id: 'a205',
          name: 'Hip Hinge Lifts',
          sets: 4,
          reps: 8,
          equipment: ['Bar', 'Plates'],
          description: 'Stand with feet hip-width apart, bend at hips to grip bar, lift by extending hips and knees.',
          duration: 0
        },
        {
          id: 'a206',
          name: 'Vertical Pulls',
          sets: 3,
          reps: 10,
          equipment: ['Pull Bar'],
          description: 'Hang from bar with palms forward, pull body up until chin clears bar, then lower back down.',
          duration: 0
        }
      ],
       duration: 0
    },
    {
      id: 'p103',
      title: 'Cardiovascular Rush',
      type: 'Endurance',
      description: 'Elevate your heart rate and improve stamina with this high-energy routine.',
      imageUrl: 'assets/CR.jpg',
      timeFrame: 30,
      intensityLevel: 'Intermediate',
      gear: ['None'],
      exercises: [
        {
          id: 'a207',
          name: 'Elevated Knees',
          duration: 60,
          equipment: ['None'],
          description: 'Jog in place, bringing knees as high as comfortable.'
        },
        {
          id: 'a208',
          name: 'Full-Body Press-Jump',
          duration: 60,
          equipment: ['None'],
          description: 'Start standing, drop to floor, perform a press-up, jump feet toward hands, then leap upward.'
        },
        {
          id: 'a209',
          name: 'Plank Runners',
          duration: 60,
          equipment: ['None'],
          description: 'Begin in plank position, alternately bring knees toward chest in quick succession.'
        }
      ],
       duration: 0
    },
    {
      id: 'p104',
      title: 'Mobility & Balance Flow',
      type: 'Flexibility',
      description: 'Enhance joint mobility and mental calm with flowing movement patterns.',
      imageUrl: 'assets/1.jpg',
      timeFrame: 40,
      intensityLevel: 'Beginner',
      gear: ['Exercise Mat'],
      exercises: [
        {
          id: 'a210',
          name: 'Inverted V Stretch',
          duration: 60,
          equipment: ['Exercise Mat'],
          description: 'Begin on hands and knees, elevate hips upward and back to form a triangular shape.'
        },
        {
          id: 'a211',
          name: 'Standing Extension',
          duration: 60,
          equipment: ['Exercise Mat'],
          description: 'Step one foot backward, bend front knee, raise arms overhead while keeping back straight.'
        },
        {
          id: 'a212',
          name: 'Restorative Rest',
          duration: 60,
          equipment: ['Exercise Mat'],
          description: 'Kneel with knees apart, sit back on heels, stretch arms forward and rest forehead on mat.'
        }
      ],
         duration: 0
    }
  ];

  constructor() { }

  getAllWorkouts(): Observable<Workout[]> {
    return of(this.workouts);
  }

  getWorkoutById(id: string): Observable<Workout | undefined> {
    const workout = this.workouts.find(w => w.id === id);
    return of(workout);
  }

  getWorkoutsByType(type: string): Observable<Workout[]> {
    const filteredWorkouts = this.workouts.filter(w => w.type === type);
    return of(filteredWorkouts);
  }
}