export interface ActivityElement {
    uid: string;
    title: string;
    timeFrame?: number;
    groupCount?: number;
    repetitions?: number;
    gear: string[];
    steps: string;
  }
  
  export interface FitnessProgram {
    uid: string;
    title: string;
    category: string;
    summary: string;
    coverImage: string;
    timeFrame: number;
    intensityLevel: string;
    gear: string[];
    activityElements: ActivityElement[];
    workout: string;
  }
  
  // src/app/models/tracking.model.ts
  export interface ActivityTracking {
    programId: string;
    completionTime: string;
    userId: string;
    progress: string;
  }
  
  // src/app/models/member.model.ts
  export interface Member {
    uid: string;
    emailAddress: string;
    displayName: string;
    credentials: string; // Note: In production, never store passwords in plain text
  }
  