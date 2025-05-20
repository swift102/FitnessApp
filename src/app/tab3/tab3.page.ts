import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { ProgressTrackingService } from 'src/services/progress-tracking.service';
import { Member } from 'src/model/fitness';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class Tab3Page implements OnInit{
 memberData: Member | null = null;
  finishedWorkouts = 0;

  constructor(
    private memberService: MemberService,
    private progressTracker: ProgressTrackingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscribeMemberData();
  }

  subscribeMemberData() {
    this.memberService.activeMember.subscribe(member => {
      this.memberData = member;
    });
  }

  ionViewWillEnter() {
    // Update workout count when view is entered
    this.updateWorkoutCount();
  }

  updateWorkoutCount() {
    this.finishedWorkouts = this.progressTracker.getCompletionCount();
  }

  goToWorkouts() {
    this.router.navigate(['/tabs/workouts']);
  }

  goToProgress() {
    this.router.navigate(['/tabs/progress']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  signOut() {
    this.memberService.signOut();
    this.router.navigate(['/login']);
  }
}



