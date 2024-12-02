import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private location: Location, private userService: UserService, private router: Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.userService.authenticate(this.email, this.password)) {
      this.router.navigate(['/protected-route']);
    } else {
      this.loginError = 'E-mail ou senha incorretos';
    }
  }
}