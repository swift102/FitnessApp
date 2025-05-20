import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgramCompletion, ProgressTrackingService } from 'src/services/progress-tracking.service';
import { MemberService } from 'src/services/member.service';
import { Member } from 'src/model/fitness';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: true,
 imports: [IonicModule, CommonModule, RouterModule]
})
export class ProgressPage implements OnInit {
workoutsCompleted = 0;
  workoutHistory: ProgramCompletion[] = [];
  
  constructor(
    private progressTracker: ProgressTrackingService,
    private memberService: MemberService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadProgressData();
  }

  async loadProgressData() {
    this.workoutsCompleted = this.progressTracker.getCompletionCount();
    this.workoutHistory = await this.progressTracker.getDetailedCompletionHistory();
  }

  async showResetPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Progress',
      message: 'Are you sure you want to reset all your workout progress? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset',
          role: 'destructive',
          handler: () => {
            this.resetProgress();
          }
        }
      ]
    });

    await alert.present();
  }

  async resetProgress() {
    if (await this.progressTracker.resetAllProgress()) {
      this.workoutsCompleted = 0;
      this.workoutHistory = [];
    }
  }

  isUserLoggedIn(): boolean {
    return this.memberService.isAuthenticated();
  }

  
}
