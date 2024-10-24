import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
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
