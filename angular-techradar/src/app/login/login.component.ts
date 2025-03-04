import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../auth.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  constructor(private readonly http: HttpClient, private readonly router: Router, private readonly authService: AuthService,) {
  }

  async onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password
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
        this.router.navigate(['/techradar']);
      } else {
        alert('Login failed: ' + response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  }
}
