import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importe Router

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {} // Injete Router

  // Método de navegação
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
