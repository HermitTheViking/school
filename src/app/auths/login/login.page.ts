import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm!: FormGroup;
  errorMessage = '';
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryLogin(value: { email: string; password: string; }): void {
    this.authService.doLogin(value)
      .then(
        res => this.isLoggedIn = res,
        err => this.errorMessage = err
      );
  }
}
