import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from 'src/model/fitness';
import { WorkoutService } from '../services/workout.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class TabsPage implements OnInit {
  
  constructor() {}
  
  ngOnInit() {
    // Force icon refresh
    setTimeout(() => {
      const icons = document.querySelectorAll('ion-tab-button ion-icon');
      icons.forEach(icon => {
        // Force redraw
        icon.classList.add('icon-visible');
      });
    }, 100);
  }
}



