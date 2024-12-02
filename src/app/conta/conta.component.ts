import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [],
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private location: Location, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getLoggedInStatus().subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  goBack(): void {
    this.location.back();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}