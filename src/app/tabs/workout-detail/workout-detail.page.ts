import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { WorkoutService } from 'src/app/services/workout.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Workout, WorkoutProgress } from 'src/model/fitness';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.page.html',
  styleUrls: ['./workout-detail.page.scss'],
  standalone: true,
   imports: [IonicModule, CommonModule, FormsModule]
})
export class WorkoutDetailPage implements OnInit {

  workout: Workout | undefined;
  isWorkoutCompleted = false;
  userProgress: WorkoutProgress[] = [];

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private storageService: StorageService,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadWorkout();
  }

  loadWorkout() {
    const workoutId = this.route.snapshot.paramMap.get('id');
    
    if (workoutId) {
      // Get workout details
      this.workoutService.getWorkoutById(workoutId).subscribe(workout => {
        this.workout = workout;
        
        // Check if the workout is already completed
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          this.storageService.getUserProgress(currentUser.id).subscribe(progress => {
            this.userProgress = progress;
            this.isWorkoutCompleted = this.userProgress.some(
              p => p.workoutId === workoutId && p.completed
            );
          });
        }
      });
    }
  }

  markAsCompleted() {
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser && this.workout && !this.isWorkoutCompleted) {
      this.storageService.markWorkoutCompleted(currentUser.id, this.workout.id).subscribe(success => {
        if (success) {
          this.isWorkoutCompleted = true;
          this.presentToast('Workout marked as completed!');
        }
      });
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }
}
