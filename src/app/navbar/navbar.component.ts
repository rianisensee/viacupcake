import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { CommonModule } from '@angular/common';  // Importando CommonModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],  // Adicionando CommonModule aqui
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  totalItensCarrinho: number = 0;

  constructor(private router: Router, private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    // Atualizar o total de itens no carrinho
    this.totalItensCarrinho = this.carrinhoService.obterTotalItens();
  }

  // Método de navegação
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
