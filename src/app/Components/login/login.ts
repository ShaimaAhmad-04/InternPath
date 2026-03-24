import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }
    // Later: connect to backend auth API
    this.errorMessage = 'Invalid credentials. (connect to backend)';
  }

  loginAsStudent(): void {
    // Later: auto-login with student demo account
    this.router.navigate(['/internships']);
  }

  loginAsRecruiter(): void {
    // Later: auto-login with recruiter demo account
    this.router.navigate(['/recruiter-dashboard']);
  }

  loginAsAdmin(): void {
    // Later: auto-login with admin demo account
    this.router.navigate(['/admin-dashboard']);
  }

  goToSignup(): void {

  this.router.navigate(['/signup']);
  }
}