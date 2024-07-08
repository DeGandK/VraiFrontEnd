import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'https://localhost:7045/api/User';

  isConnectedSubject: Subject<boolean> = new Subject<boolean>();

  get isConnected(): boolean {
    return localStorage.getItem('token') != undefined;
  }
  constructor(private client: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    this.client
      .post(this.url + '/login', { email, password }, { responseType: 'text' })
      .subscribe({
        next: (token: string) => {
          localStorage.setItem('token', token);
          this.isConnectedSubject.next(this.isConnected);
        },
      });
  }

  register(
    username: string,
    email: string,
    password: string,
    profilePicture: string
  ): Observable<void> {
    const body = {
      username,
      email,
      password,
      profilePicture,
    };
    return this.client.post<void>(`${this.url}/register`, body);
  }

  logout() {
    localStorage.removeItem('token');
    this.isConnectedSubject.next(this.isConnected);
    this.router.navigate(['home']);
  }
}
