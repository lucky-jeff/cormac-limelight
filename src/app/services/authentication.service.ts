import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(private http: HttpClient) {
    let user: User = null;
    try {
      user = JSON.parse(localStorage.getItem('currentUser'));
    } catch (err) {
      console.error(err);
    }
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string): Observable<User> {
    return this.http
      .get<any>(`${environment.apiUrl}/users?email=${email}`)
      .pipe(
        map((users: Array<User>) => {
          if (users.length) {
            localStorage.setItem('currentUser', JSON.stringify(users[0]));
          }
          this.currentUserSubject.next(users[0]);
          return users[0];
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
