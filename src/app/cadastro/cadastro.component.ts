import { Component } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertComponent } from '../alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule,AlertComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  maskedPassword: string = '';
  maskedConfirmPassword: string = '';
  showPassword: boolean = false;
  passwordTimeout: any;
  confirmPasswordTimeout: any;
  registrationError: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private location: Location, 
    private userService: UserService,
    private router: Router
  ) {}

  goBack(): void {
    this.location.back();
  }

  onPasswordInput(event: Event): void {
    clearTimeout(this.passwordTimeout);

    const inputElement = event.target as HTMLInputElement;
    const actualPassword = inputElement.value;

    this.password = actualPassword;

    this.maskedPassword = '*'.repeat(this.password.length - 1) + this.password.slice(-1);

    this.passwordTimeout = setTimeout(() => {
      this.maskedPassword = '*'.repeat(this.password.length);
    }, 750);
  }

  onConfirmPasswordInput(event: Event): void {
    clearTimeout(this.confirmPasswordTimeout);

    const inputElement = event.target as HTMLInputElement;
    const actualConfirmPassword = inputElement.value;

    this.confirmPassword = actualConfirmPassword;

    this.maskedConfirmPassword = '*'.repeat(this.confirmPassword.length - 1) + this.confirmPassword.slice(-1);

    this.confirmPasswordTimeout = setTimeout(() => {
      this.maskedConfirmPassword = '*'.repeat(this.confirmPassword.length);
    }, 750);
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.registrationError = 'As senhas não coincidem';
      return;
    }

    const existingUser = this.userService.findUserByEmail(this.email);
    if (existingUser) {
      this.registrationError = 'E-mail já cadastrado';
      return;
    }

    this.userService.register({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
    this.alertMessage = 'Conta criada com sucesso!';
    this.showAlert = true;
  }
  closeAlert(): void {
    this.showAlert = false;
    this.router.navigate(['/']);
  }
}