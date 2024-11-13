import { Component, OnInit } from '@angular/core';
import { SaborService } from '../services/sabor.service';
import { Sabor } from '../models/sabor.model';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../services/carrinho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  sabores: Sabor[] = [];
  quantidades: { [key: number]: number } = {};
  selectedDeliveryMethod: string | null = null;

  constructor(
    private location: Location, 
    private saborService: SaborService, 
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sabores = this.saborService.getSabores();
    this.sabores.forEach(sabor => {
      this.quantidades[sabor.id] = 1;
    });
  }

  adicionarAoCarrinho(saborId: number, quantidade: number): void {
    this.carrinhoService.adicionarAoCarrinho(saborId, quantidade);
  }

  aumentarQuantidade(saborId: number): void {
    this.quantidades[saborId] += 1;
  }

  diminuirQuantidade(saborId: number): void {
    if (this.quantidades[saborId] > 1) {
      this.quantidades[saborId] -= 1;
    }
  }

  obterQuantidade(saborId: number): number {
    return this.quantidades[saborId] || 1;
  }

  goBack(): void {
    this.location.back();
  }

  selecionarFormaDeEntrega(metodo: string): void {
    this.selectedDeliveryMethod = metodo;
  }

  finalizarCompra(): void {
    this.router.navigate(['/compra']);
  }
}
