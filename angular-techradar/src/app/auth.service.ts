import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private readonly loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem('auth_token');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{
      success: boolean,
      token: string,
      message: string
    }>(`http://localhost:3000/api/v1/login`, {username, password});
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
    this.loggedInSubject.next(true);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return this.token;
  }

  isAdministrator(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // JWT-Dekodierung
      return payload.role === 'admin';
    } catch (e) {
      return false;
    }
  }
}
