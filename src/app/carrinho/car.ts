import { Component, OnInit, OnDestroy } from '@angular/core';
import { SaborService } from '../services/sabor.service';
import { Sabor } from '../models/sabor.model';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../services/carrinho.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit, OnDestroy {
  sabores: Sabor[] = [];
  quantidades: { [key: number]: number } = {};
  selectedDeliveryMethod: string | null = null;
  itensCarrinho: any[] = [];
  subtotal: number = 0;
  private carrinhoSubscription: Subscription | undefined;

  constructor(
    private location: Location, 
    private saborService: SaborService, 
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carrinhoSubscription = this.carrinhoService.itensCarrinho$.subscribe(itens => {
      this.itensCarrinho = itens;
      this.atualizarSubtotal();
    });
  }

  ngOnDestroy(): void {
    if (this.carrinhoSubscription) {
      this.carrinhoSubscription.unsubscribe();
    }
  }

  atualizarSubtotal(): void {
    this.subtotal = this.carrinhoService.calcularSubtotalCarrinho();
  }

  aumentarQuantidade(saborId: number): void {
    const item = this.itensCarrinho.find(i => i.saborId === saborId);
    if (item) {
      this.carrinhoService.atualizarQuantidade(saborId, item.quantidade + 1);
    }
  }

  diminuirQuantidade(saborId: number): void {
    const item = this.itensCarrinho.find(i => i.saborId === saborId);
    if (item && item.quantidade > 1) {
      this.carrinhoService.atualizarQuantidade(saborId, item.quantidade - 1);
    }
  }

  removerDoCarrinho(saborId: number): void {
    this.carrinhoService.removerDoCarrinho(saborId);
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