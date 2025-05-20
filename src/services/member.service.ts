import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { Member } from 'src/app/model/fitness';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly MEMBERS_REGISTRY_KEY = 'fitness_members_registry';
  private readonly ACTIVE_MEMBER_KEY = 'active_member';
  
  private activeMemberSubject = new BehaviorSubject<Member | null>(null);
  public activeMember = this.activeMemberSubject.asObservable();

  constructor() {
    this.loadActiveMember();
    this.initializeDefaultMembers();
  }
  
  private async initializeDefaultMembers() {
    const membersList = await this.getMembersRegistry();
    if (membersList.length === 0) {
      // Add a sample member for testing
      const testMember: Member = {
        uid: 'mem1',
        emailAddress: 'demo@fitnessapp.com',
        displayName: 'Demo User',
        credentials: 'demo123456'
      };
      await this.saveMembersRegistry([testMember]);
      console.log('Demo member created for testing');
    }
  }

  async loadActiveMember() {
    try {
      const { value } = await Preferences.get({ key: this.ACTIVE_MEMBER_KEY });
      if (value) {
        this.activeMemberSubject.next(JSON.parse(value));
      }
    } catch (error) {
      console.error('Failed to load active member:', error);
    }
  }
  
  async getMembersRegistry(): Promise<Member[]> {
    try {
      const { value } = await Preferences.get({ key: this.MEMBERS_REGISTRY_KEY });
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Failed to retrieve members registry:', error);
      return [];
    }
  }
  
  async saveMembersRegistry(members: Member[]): Promise<void> {
    try {
      await Preferences.set({
        key: this.MEMBERS_REGISTRY_KEY,
        value: JSON.stringify(members)
      });
    } catch (error) {
      console.error('Failed to save members registry:', error);
    }
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    try {
      const members = await this.getMembersRegistry();
      const member = members.find(m => 
        m.emailAddress.toLowerCase() === email.toLowerCase() && m.credentials === password
      );

      if (member) {
        this.activeMemberSubject.next(member);
        await Preferences.set({
          key: this.ACTIVE_MEMBER_KEY,
          value: JSON.stringify(member)
        });
        console.log('Member authenticated:', member);
        return true;
      }
      
      console.log('Authentication failed: Invalid credentials');
      return false;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }

  async register(email: string, name: string, password: string): Promise<boolean> {
    try {
      const members = await this.getMembersRegistry();
      
      if (members.some(m => m.emailAddress.toLowerCase() === email.toLowerCase())) {
        console.log('Email already registered');
        return false;
      }

      const newMember: Member = {
        uid: Date.now().toString(),
        emailAddress: email,
        displayName: name,
        credentials: password
      };

      members.push(newMember);
      await this.saveMembersRegistry(members);
      
      this.activeMemberSubject.next(newMember);
      await Preferences.set({
        key: this.ACTIVE_MEMBER_KEY,
        value: JSON.stringify(newMember)
      });
      
      console.log('Member registration successful:', newMember);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }

  async signOut() {
    try {
      this.activeMemberSubject.next(null);
      await Preferences.remove({ key: this.ACTIVE_MEMBER_KEY });
      console.log('Member signed out');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  getActiveMember(): Member | null {
    return this.activeMemberSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.activeMemberSubject.value;
  }
  
  async getAllMembers(): Promise<Member[]> {
    return this.getMembersRegistry();
  }
}
