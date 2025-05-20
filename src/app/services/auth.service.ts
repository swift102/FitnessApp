// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { User } from 'src/model/fitness';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    // Load users from localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
    
    // Check if a user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUserSubject.next(JSON.parse(currentUser));
    }
  }

  signup( email: string, password: string): Observable<boolean> {
    // Check if user already exists
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return of(false);
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password // In a real app, this should be hashed
    };

    // Add user to local storage
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    
    return of(true);
  }

  login(email: string, password: string): Observable<User | null> {
    // Find user by email and password
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Store current user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
    
    return of(user || null);
  }

  logout(): void {
    // Remove user from localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}