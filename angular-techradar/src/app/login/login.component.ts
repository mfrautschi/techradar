import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {firstValueFrom} from 'rxjs';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private readonly http: HttpClient, private readonly router: Router, private readonly authService: AuthService,) {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  async onSubmit() {
    const loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    try {
      const response = await firstValueFrom(
        this.http.post<{
          success: boolean,
          token: string,
          message: string
        }>(`http://localhost:3000/api/v1/login`, loginData));

      if (response.success) {
        this.authService.saveToken(response.token);
        await this.router.navigate(['/techradar']);
      } else {
        alert('Login failed: ' + response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  }
}
