// src/app/models/user.model.ts
export interface User {
    id: string;
    email: string;
    password: string; // Note: In a real app, never store plain passwords
  }
  
  // src/app/models/workout.model.ts
  export interface Workout {
    id: string;
    title: string;
    type: string;
    description: string;
    imageUrl: string;
    intensityLevel: string;
    gear: string[];
    timeFrame: number;
    duration: number; // in minutes
    exercises: Exercise[];
  }
  
  export interface Exercise {
    id: string;
    name: string;
    description: string;
    duration: number; // in seconds
    sets?: number;
    reps?: number;
    equipment: string[];
  }
  
  // src/app/models/progress.model.ts
  export interface WorkoutProgress {
    userId: string;
    workoutId: string;
    completed: boolean;
    completedDate: Date;
  }