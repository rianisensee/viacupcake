import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private currentId = 1;

  register(user: Omit<User, 'id'>): void {
    const newUser: User = { ...user, id: this.currentId++ };
    this.users.push(newUser);
  }

  getUsers(): User[] {
    return this.users;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}