import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from 'src/app/services/workout.service';
import { Workout } from 'src/model/fitness';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WorkoutsPage implements OnInit {
workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  selectedType: string = 'all';
  types: string[] = ['all', 'Weight Loss', 'Muscle Gain', 'Cardio'];
  
  constructor(
    private workoutService: WorkoutService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.workoutService.getAllWorkouts().subscribe(workouts => {
      this.workouts = workouts;
      this.filterWorkouts();
    });
  }

  filterWorkouts() {
    if (this.selectedType === 'all') {
      this.filteredWorkouts = this.workouts;
    } else {
      this.filteredWorkouts = this.workouts.filter(w => w.type === this.selectedType);
    }
  }

  segmentChanged(event: any) {
    this.selectedType = event.detail.value;
    this.filterWorkouts();
  }

  goToWorkoutDetail(workoutId: string) {
    this.router.navigate(['/workout-detail', workoutId]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

