import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AlertComponent {
  @Input() showAlert: boolean = false;
  @Input() alertMessage: string = '';
  @Output() close = new EventEmitter<void>();

  closeAlert() {
    this.showAlert = false;
    this.close.emit();
  }
}