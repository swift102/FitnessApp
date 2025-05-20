import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { StorageService } from 'src/app/services/storage.service';
import { Workout, WorkoutProgress } from 'src/model/fitness';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

interface CompletedWorkout {
  workout: Workout;
  progress: WorkoutProgress;
}

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProgressPage implements OnInit {

  completedWorkouts: CompletedWorkout[] = [];
  totalMinutes = 0;
  streak = 0;

  constructor(
    private workoutService: WorkoutService,
    private storageService: StorageService,
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProgress();
  }

  ionViewWillEnter() {
    this.loadProgress();
  }

  loadProgress() {
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser) {
      this.storageService.getUserProgress(currentUser.id).subscribe(progressList => {
        // Reset data
        this.completedWorkouts = [];
        this.totalMinutes = 0;
        
        // Process each progress entry
        progressList.forEach(progress => {
          this.workoutService.getWorkoutById(progress.workoutId).subscribe(workout => {
            if (workout) {
              this.completedWorkouts.push({
                workout,
                progress
              });
              
              // Add to total minutes
              this.totalMinutes += workout.duration;
              
              // Sort by date (newest first)
              this.completedWorkouts.sort((a, b) => {
                return new Date(b.progress.completedDate).getTime() - 
                      new Date(a.progress.completedDate).getTime();
              });
              
              // Calculate streak (simplified version - consecutive days)
              this.calculateStreak();
            }
          });
        });
      });
    }
  }

  calculateStreak() {
    // Simplified streak calculation
    if (this.completedWorkouts.length === 0) {
      this.streak = 0;
      return;
    }
    
    // Start with 1 day streak
    this.streak = 1;
    
    // Note: For a real app, you would implement a more sophisticated
    // algorithm to track consecutive days of workouts
  }

  async confirmReset() {
    const alert = await this.alertController.create({
      header: 'Reset Progress',
      message: 'Are you sure you want to reset all your progress? This cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset',
          handler: () => {
            this.resetProgress();
          }
        }
      ]
    });

    await alert.present();
  }

  resetProgress() {
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser) {
      this.storageService.resetUserProgress(currentUser.id).subscribe(success => {
        if (success) {
          this.completedWorkouts = [];
          this.totalMinutes = 0;
          this.streak = 0;
          this.presentToast('Progress has been reset');
        }
      });
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }

  navigateToWorkouts() {
    this.router.navigate(['/tabs/workouts']);
  }

}

