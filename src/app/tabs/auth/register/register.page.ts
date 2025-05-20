import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class RegisterPage {
registrationForm: FormGroup;

constructor(
  private fb: FormBuilder,
  private memberService: MemberService,
  private router: Router,
  private toastCtrl: ToastController
) {
  // Initialize form with validation
  this.registrationForm = this.createRegistrationForm();
}

createRegistrationForm(): FormGroup {
  return this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]]
  }, { validators: this.validatePasswordMatch });
}

validatePasswordMatch(formGroup: FormGroup) {
  const pass = formGroup.get('password')?.value;
  const confirmPass = formGroup.get('passwordConfirm')?.value;

  if (pass !== confirmPass) {
    formGroup.get('passwordConfirm')?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  
  return null;
}

async submitRegistration() {
  console.log('Registration submitted', this.registrationForm.value);
  
  if (this.registrationForm.invalid) {
    console.log('Form validation failed', this.registrationForm.errors);
    await this.showToast('Please correct the errors in the form', 'danger');
    return;
  }

  try {
    const { name, email, password } = this.registrationForm.value;
    console.log('Registering user:', { name, email });
    
    const registrationSuccessful = await this.memberService.register(email, name, password);

    if (registrationSuccessful) {
      await this.showToast('Registration successful!', 'success');
      this.router.navigateByUrl('/login');
    } else {
      await this.showToast('Email already registered', 'danger');
    }
  } catch (error) {
    console.error('Registration error:', error);
    const errorMessage = (error as any)?.message || 'Unknown error';
    await this.showToast(`Registration failed: ${errorMessage}`, 'danger');
  }
}

async showToast(message: string, color: string) {
  const toast = await this.toastCtrl.create({
    message,
    duration: 2000,
    color
  });
  await toast.present();
}

navigateToLogin() {
  this.router.navigateByUrl('/login');
}
}
