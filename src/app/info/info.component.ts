import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
