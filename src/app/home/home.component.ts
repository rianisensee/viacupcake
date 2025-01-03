import { Component, OnInit } from '@angular/core';
import { SaborService } from '../services/sabor.service';
import { Sabor } from '../models/sabor.model';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  sabores: any[] = [];
  quantidades: { [key: number]: number } = {};

  constructor(private saborService: SaborService, private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.sabores = this.saborService.getSabores();
    this.sabores.forEach(sabor => {
      this.quantidades[sabor.id] = 1;
    });
  }

  adicionarAoCarrinho(saborId: number, quantidade: number): void {
    this.carrinhoService.adicionarAoCarrinho(saborId, quantidade);
    this.resetQuantidades();
  }

  obterQuantidade(saborId: number): number {
    return this.quantidades[saborId] || 1;
  }

  aumentarQuantidade(saborId: number): void {
    this.quantidades[saborId]++;
  }

  diminuirQuantidade(saborId: number): void {
    if (this.quantidades[saborId] > 1) {
      this.quantidades[saborId]--;
    }
  }

  private resetQuantidades(): void {
    this.sabores.forEach(sabor => {
      this.quantidades[sabor.id] = 1;
    });
  }
}