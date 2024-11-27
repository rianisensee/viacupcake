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
  subtotal: number = 0;
  mensagemErro: string | null = null;
  mensagemErroEndereco: string | null = null; // Adiciona a variável mensagemErroEndereco

  constructor(
    private location: Location, 
    private saborService: SaborService, 
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
    this.atualizarSubtotal();
  }

  atualizarSubtotal(): void {
    this.subtotal = this.carrinhoService.calcularSubtotalCarrinho();
  }

  aumentarQuantidade(saborId: number): void {
    const item = this.itensCarrinho.find(i => i.saborId === saborId);
    if (item) {
      this.carrinhoService.atualizarQuantidade(saborId, item.quantidade + 1);
      this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
      this.atualizarSubtotal(); // Atualiza o subtotal
    }
  }

  diminuirQuantidade(saborId: number): void {
    const item = this.itensCarrinho.find(i => i.saborId === saborId);
    if (item && item.quantidade > 1) {
      this.carrinhoService.atualizarQuantidade(saborId, item.quantidade - 1);
      this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
      this.atualizarSubtotal(); // Atualiza o subtotal
    }
  }

  removerDoCarrinho(saborId: number): void {
    this.carrinhoService.removerDoCarrinho(saborId);
    this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
    this.atualizarSubtotal();
  }

  goBack(): void {
    this.location.back();
  }

  selecionarFormaDeEntrega(metodo: string): void {
    this.selectedDeliveryMethod = metodo;
    this.mensagemErro = null;
    this.mensagemErroEndereco = null;
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      if (metodo === 'receber') {
        const addressFormElement = document.querySelector('.address-form');
        if (addressFormElement) {
          addressFormElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 0);
  }

  finalizarCompra(): void {
    if (!this.selectedDeliveryMethod) {
      this.mensagemErro = 'Selecione a forma de entrega';
      setTimeout(() => {
        const errorMessageElement = document.getElementById('errorMessage');
        if (errorMessageElement) {
          errorMessageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 0);
    } else if (this.selectedDeliveryMethod === 'receber') {
      const enderecoInput = document.getElementById('endereco') as HTMLInputElement;
      if (!enderecoInput.value) {
        this.mensagemErroEndereco = 'Insira um endereço para a entrega';
        setTimeout(() => {
          const errorMessageElement = document.querySelector('.error-message');
          if (errorMessageElement) {
            errorMessageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 0);
      } else {
        this.router.navigate(['/compra']);
      }
    } else {
      this.router.navigate(['/compra']);
    }
  }
}