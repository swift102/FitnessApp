import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from 'src/app/services/workout.service';
import { Workout } from 'src/model/fitness';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { FitnessService } from 'src/services/fitness.service';
import { FitnessProgram } from 'src/model/fitness';
import { RouterModule, Route } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class WorkoutsPage implements OnInit {
 allWorkouts: FitnessProgram[] = [];
  displayedWorkouts: FitnessProgram[] = [];
  availableTypes: string[] = [];
  
  constructor(private fitnessService: FitnessService,  private authService: AuthService,    private router: Router) {}

  ngOnInit() {
    this.fetchWorkouts();
  }

  async fetchWorkouts() {
    try {
      // Fetch workouts from service
      this.allWorkouts = await this.fitnessService.retrieveAllPrograms();
      
      // Initialize displayed workouts with all workouts
      this.displayedWorkouts = [...this.allWorkouts];
      
      // Generate unique workout types
      this.generateWorkoutTypes();
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  }

  generateWorkoutTypes() {
    // Create a unique set of workout types
    const typeCollection = new Set<string>();
    
    // Add each workout type to the set
    this.allWorkouts.forEach(workout => {
      if (workout.category) {
        typeCollection.add(workout.category);
      }
    });
    
    // Convert set to array
    this.availableTypes = Array.from(typeCollection);
  }

  handleTypeChange(event: any) {
    const typeFilter = event.detail.value;
    
    // Reset to all workouts if "All" is selected
    if (typeFilter === 'All') {
      this.displayedWorkouts = [...this.allWorkouts];
      return;
    }
    
    // Filter workouts by selected type
    this.displayedWorkouts = this.allWorkouts.filter(
      workout => workout.category === typeFilter
    );
  }

   logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

