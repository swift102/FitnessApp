import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FitnessService } from 'src/services/fitness.service';
import { ProgressTrackingService } from 'src/services/progress-tracking.service';
import { FitnessProgram } from 'src/model/fitness';
@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.page.html',
  styleUrls: ['./workout-detail.page.scss'],
  standalone: true,
   imports: [IonicModule, CommonModule]
})
export class WorkoutDetailPage implements OnInit {
 workoutData?: FitnessProgram;
  workoutCompleted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fitnessService: FitnessService,
    private progressTracker: ProgressTrackingService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadWorkoutDetails();
  }

  async loadWorkoutDetails() {
    // Get workout ID from route params
    const uid = this.activatedRoute.snapshot.paramMap.get('uid');

    
    if (uid) {
      // Load workout details
      this.workoutData = await this.fitnessService.findProgramById(uid);
      
      // Check completion status
      this.checkCompletionStatus(uid);
    }
  }

  checkCompletionStatus(workoutId: string) {
    this.workoutCompleted = this.progressTracker.isProgramCompleted(workoutId);
  }

  async completeWorkout() {
    if (!this.workoutData) return;
    
    const result = await this.progressTracker.markProgramCompleted(this.workoutData.uid);
    
    if (result) {
      // Update completion status
      this.workoutCompleted = true;
      
      // Show success message
      await this.showNotification('Congratulations! Workout completed!', 'success');
    } else {
      // Show login required message
      await this.showNotification('Please log in to track your progress', 'warning');
    }
  }

  async showNotification(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }
}
