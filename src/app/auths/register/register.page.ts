import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryRegister(value: { email: string; password: string; }): void {
    this.authService.doRegister(value)
      .then(
        res => { this.successMessage = res, this.errorMessage = ''; },
        err => { this.successMessage = '', this.errorMessage = err; }
      );
  }
}
