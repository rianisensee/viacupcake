import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string = '';
  maskedPassword: string = '';
  showPassword: boolean = false;
  passwordTimeout: any;

  constructor(private location: Location) {}

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
}
