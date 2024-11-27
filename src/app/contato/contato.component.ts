import { Component } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    this.alertMessage = 'Mensagem enviada com sucesso!';
    this.showAlert = true;
  }

  closeAlert(form: any): void {
    this.showAlert = false;
    form.reset();
  }
}