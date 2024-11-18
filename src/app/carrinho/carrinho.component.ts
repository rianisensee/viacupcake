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
export class CarrinhoComponent implements OnInit {
  sabores: Sabor[] = [];
  quantidades: { [key: number]: number } = {};
  selectedDeliveryMethod: string | null = null;
  itensCarrinho: any[] = [];

  constructor(
    private location: Location, 
    private saborService: SaborService, 
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
  }

  aumentarQuantidade(saborId: number): void {
    const item = this.itensCarrinho.find(i => i.saborId === saborId);
    if (item) {
      this.carrinhoService.atualizarQuantidade(saborId, item.quantidade + 1);
      this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
    }
  }

  diminuirQuantidade(saborId: number): void {
    const item = this.itensCarrinho.find(i => i.saborId === saborId);
    if (item && item.quantidade > 1) {
      this.carrinhoService.atualizarQuantidade(saborId, item.quantidade - 1);
      this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
    }
  }

  removerDoCarrinho(saborId: number): void {
    this.carrinhoService.removerDoCarrinho(saborId);
    this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
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
