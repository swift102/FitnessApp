import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule ,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule,ReactiveFormsModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
 loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Check if user is already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tabs/tab3']);
    }
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        user => {
          if (user) {
            this.router.navigate(['/tabs/tab3']);
          } else {
            this.presentToast('Invalid email or password');
          }
        },
        error => {
          this.presentToast('Login failed: ' + error.message);
        }
      );
    } else {
      this.presentToast('Please fill all required fields');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
