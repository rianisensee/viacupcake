import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
