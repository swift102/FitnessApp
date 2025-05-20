import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FitnessService } from './fitness.service';
import { MemberService } from './member.service';
import { FitnessProgram, ActivityTracking } from 'src/model/fitness';

export interface ProgramCompletion {
  trackingData: ActivityTracking;
  programDetails: FitnessProgram;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressTrackingService {
  private completionsSubject = new BehaviorSubject<ActivityTracking[]>([]);
  
  constructor(
    private fitnessService: FitnessService,
    private memberService: MemberService
  ) {
    this.refreshCompletionHistory();
  }
  
  async refreshCompletionHistory() {
    const activeMember = this.memberService.getActiveMember();
    if (activeMember) {
      const history = await this.fitnessService.retrieveActivityHistory(activeMember.uid);
      this.completionsSubject.next(history);
    } else {
      this.completionsSubject.next([]);
    }
  }
  
  getCompletionHistory(): Observable<ActivityTracking[]> {
    return this.completionsSubject.asObservable();
  }
  
  getCompletionCount(): number {
    return this.completionsSubject.value.length;
  }
  
  isProgramCompleted(programId: string): boolean {
    const activeMember = this.memberService.getActiveMember();
    if (!activeMember) return false;
    
    return this.completionsSubject.value.some(
      record => record.programId === programId && record.userId === activeMember.uid
    );
  }
  
  async markProgramCompleted(programId: string): Promise<boolean> {
    const activeMember = this.memberService.getActiveMember();
    if (!activeMember) return false;
    
    const success = await this.fitnessService.recordActivity(programId, activeMember.uid);
    if (success) {
      await this.refreshCompletionHistory();
    }
    return success;
  }
  
  async resetAllProgress(): Promise<boolean> {
    const activeMember = this.memberService.getActiveMember();
    if (!activeMember) return false;
    
    const success = await this.fitnessService.clearHistory(activeMember.uid);
    if (success) {
      await this.refreshCompletionHistory();
    }
    return success;
  }
  
  async getDetailedCompletionHistory(): Promise<ProgramCompletion[]> {
    const history = this.completionsSubject.value;
    const detailedHistory: ProgramCompletion[] = [];
    
    for (const record of history) {
      const program = await this.fitnessService.findProgramById(record.programId);
      if (program) {
        detailedHistory.push({
          trackingData: record,
          programDetails: program
        });
      }
    }
    
    return detailedHistory;
  }
}

