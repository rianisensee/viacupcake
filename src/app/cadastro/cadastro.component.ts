import { Component } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertComponent } from '../alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  registrationError: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';

  firstNameError: string = '';
  lastNameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  constructor(
    private location: Location,
    private userService: UserService,
    private router: Router
  ) { }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.clearErrors();

    if (!this.firstName) {
      this.firstNameError = 'Campo obrigatório';
    }

    if (!this.lastName) {
      this.lastNameError = 'Campo obrigatório';
    }

    if (!this.email) {
      this.emailError = 'Campo obrigatório';
    } else if (!this.validateEmail(this.email)) {
      this.emailError = 'Digite um e-mail válido';
    }

    if (!this.password) {
      this.passwordError = 'Campo obrigatório';
    } else if (this.password.length < 6) {
      this.passwordError = 'A senha deve possuir no mínimo 6 caracteres';
    }

    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Campo obrigatório';
    } else if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'As senhas não coincidem';
    }

    const existingUser = this.userService.findUserByEmail(this.email);
    if (existingUser) {
      this.emailError = 'E-mail já cadastrado';
    }

    if (this.firstNameError || this.lastNameError || this.emailError || this.passwordError || this.confirmPasswordError) {
      return;
    }

    this.alertMessage = 'Conta criada com sucesso!';
    this.showAlert = true;
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  clearErrors(): void {
    this.firstNameError = '';
    this.lastNameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
  }

  closeAlert(): void {
    this.showAlert = false;
    this.router.navigate(['/']);
  }
}