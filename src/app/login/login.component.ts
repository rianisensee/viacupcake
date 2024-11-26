import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  maskedPassword: string = '';
  showPassword: boolean = false;
  passwordTimeout: any;
  loginError: string = '';

  constructor(private location: Location, private userService: UserService) {}

  goBack(): void {
    this.location.back();
  }

  onPasswordInput(event: Event): void {
    clearTimeout(this.passwordTimeout);

    const inputElement = event.target as HTMLInputElement;
    const actualPassword = inputElement.value;

    this.password = actualPassword;

    if (this.password.length > 0) {
      this.maskedPassword = '*'.repeat(this.password.length - 1) + this.password.slice(-1);
    } else {
      this.maskedPassword = '';
    }

    this.passwordTimeout = setTimeout(() => {
      this.maskedPassword = '*'.repeat(this.password.length);
    }, 750);
  }

  onSubmit(): void {
    const user = this.userService.findUserByEmail(this.email);
    if (user && user.password === this.password) {
      alert('Login realizado com sucesso!');
      // Redirecionar para a página principal ou outra página
    } else {
      this.loginError = 'E-mail ou senha incorretos';
    }
  }
}