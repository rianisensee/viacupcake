import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  totalItensCarrinho: number = 0;
  private subscriptions: Subscription[] = [];
  isLoggedIn: boolean = false;

  constructor(private router: Router, private carrinhoService: CarrinhoService, private userService: UserService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.carrinhoService.itensCarrinho$.subscribe(itens => {
        this.totalItensCarrinho = itens.reduce((total, item) => total + item.quantidade, 0);
      })
    );

    this.subscriptions.push(
      this.userService.getLoggedInStatus().subscribe(status => {
        this.isLoggedIn = status;
      })
    );

    this.isLoggedIn = this.userService.isLoggedIn();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}