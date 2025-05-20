// src/app/services/error-handling.service.ts
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subject, Observable } from 'rxjs';

export interface AppError {
  code: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'fatal';
  timestamp: Date;
  context?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandling {
  private errorSubject = new Subject<AppError>();
  public errors$: Observable<AppError> = this.errorSubject.asObservable();

  constructor(private toastCtrl: ToastController) {
    // Subscribe to error stream to show toasts
    this.errors$.subscribe(error => {
      if (error.severity === 'error' || error.severity === 'fatal') {
        this.showErrorToast(error);
      }
    });
  }

  handleError(error: any, context?: string): AppError {
    // Create standardized error object
    const appError: AppError = {
      code: error.code || 'unknown',
      message: error.message || 'An unexpected error occurred',
      severity: this.determineSeverity(error),
      timestamp: new Date(),
      context: context
    };

    console.error(`[${appError.severity.toUpperCase()}] ${context ? context + ': ' : ''}${appError.message}`, error);
    this.errorSubject.next(appError);
    return appError;
  }

  private determineSeverity(error: any): 'info' | 'warning' | 'error' | 'fatal' {
    // Determine error severity based on error type
    if (error.fatal) return 'fatal';
    if (error.status === 401 || error.status === 403) return 'warning';
    return 'error';
  }

  async showErrorToast(error: AppError) {
    const toast = await this.toastCtrl.create({
      message: error.message,
      duration: 3000,
      position: 'top',
      color: error.severity === 'fatal' ? 'danger' : 'warning',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  // Method for form validation errors
  getFormValidationMessage(controlName: string, error: any): string {
    const errorMessages: { [key: string]: { [key: string]: string } } = {
      email: {
        required: 'Email is required',
        email: 'Please enter a valid email address'
      },
      password: {
        required: 'Password is required',
        minlength: 'Password must be at least 6 characters'
      },
      name: {
        required: 'Name is required'
      },
      passwordConfirm: {
        required: 'Please confirm your password',
        passwordMismatch: 'Passwords do not match'
      }
    };

    // Get the first error key
    const errorKey = Object.keys(error)[0];
    return errorMessages[controlName]?.[errorKey] || 'Invalid input';
  }
}