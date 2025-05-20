// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';
import { WorkoutProgress } from 'src/model/fitness';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private progress: WorkoutProgress[] = [];

  constructor() {
    // Load progress from localStorage
    const storedProgress = localStorage.getItem('workoutProgress');
    if (storedProgress) {
      this.progress = JSON.parse(storedProgress);
    }
  }

  getCompletionCount(): number {
    return this.progress.values.length;
  }

  markWorkoutCompleted(userId: string, workoutId: string): Observable<boolean> {
    const progressEntry: WorkoutProgress = {
      userId,
      workoutId,
      completed: true,
      completedDate: new Date()
    };

    // Check if this workout was already completed
    const existingIndex = this.progress.findIndex(
      p => p.userId === userId && p.workoutId === workoutId
    );

    if (existingIndex >= 0) {
      // Update existing entry
      this.progress[existingIndex] = progressEntry;
    } else {
      // Add new entry
      this.progress.push(progressEntry);
    }

    // Save to localStorage
    localStorage.setItem('workoutProgress', JSON.stringify(this.progress));
    
    return of(true);
  }

  getUserProgress(userId: string): Observable<WorkoutProgress[]> {
    const userProgress = this.progress.filter(p => p.userId === userId);
    return of(userProgress);
  }

  resetUserProgress(userId: string): Observable<boolean> {
    this.progress = this.progress.filter(p => p.userId !== userId);
    localStorage.setItem('workoutProgress', JSON.stringify(this.progress));
    return of(true);
  }
}