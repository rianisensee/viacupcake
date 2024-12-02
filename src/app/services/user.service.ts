import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private currentId = 1;
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticated.next(authStatus);
  }

  authenticate(email: string, password: string): boolean {
    if (email === 'user@example.com' && password === 'pa1234') {
      this.isAuthenticated.next(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    } else {
      this.isAuthenticated.next(false);
      localStorage.setItem('isAuthenticated', 'false');
      return false;
    }
  }

  register(user: Omit<User, 'id'>): void {
    const newUser: User = { ...user, id: this.currentId++ };
    this.users.push(newUser);
  }

  getUsers(): User[] {
    return this.users;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  getLoggedInStatus() {
    return this.isAuthenticated.asObservable();
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.setItem('isAuthenticated', 'false');
  }

  findUserByEmail(email: string): any {
    const users = [
      { email: 'user@example.com', password: 'pa1234' }
    ];
    return users.find(user => user.email === email);
  }
}