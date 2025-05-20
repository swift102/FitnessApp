import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ErrorHandling } from 'src/services/error-handling.service';
import { finalize } from 'rxjs/operators';
import { MemberService } from 'src/services/member.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class LoginPage
{  accessForm: FormGroup;
  isLoading = false;
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private router: Router,
    private toastController: ToastController,
    private errorService: ErrorHandling
  ) {
    this.accessForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      credentials: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Convenience getters for form fields
  get email() { return this.accessForm.get('emailAddress'); }
  get password() { return this.accessForm.get('credentials'); }

  // Get error message for a specific form control
  getErrorMessage(controlName: string): string {
    const control = this.accessForm.get(controlName);
    if (control?.invalid && (control?.dirty || control?.touched || this.formSubmitted)) {
      return this.errorService.getFormValidationMessage(controlName, control.errors);
    }
    return '';
  }

  async handleLogin() {
    this.formSubmitted = true;
    
    if (this.accessForm.invalid) {
      Object.keys(this.accessForm.controls).forEach(key => {
        const control = this.accessForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
          console.log(`${key} validation failed:`, control.errors);
        }
      });
      return;
    }

    const { emailAddress, credentials } = this.accessForm.value;
    this.isLoading = true;
    
    try {
      const authenticated = await this.memberService.authenticate(emailAddress, credentials);
      
      if (authenticated) {
        this.router.navigateByUrl('/tabs/tab3');
      } else {
        this.errorService.handleError(
          { message: 'Invalid email or password', code: 'AUTH_INVALID' }, 
          'Login'
        );
      }
    } catch (error) {
      this.errorService.handleError(error, 'Login');
    } finally {
      this.isLoading = false;
    }
  }
  
  navigateToRegistration() {
    this.router.navigateByUrl('/register');
  }
}