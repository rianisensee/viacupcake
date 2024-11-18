import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})
export class ContaComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

}
