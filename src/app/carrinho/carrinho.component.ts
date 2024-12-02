import { Component, OnInit } from '@angular/core';
import { SaborService } from '../services/sabor.service';
import { Sabor } from '../models/sabor.model';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../services/carrinho.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service'; // Importe o UserService

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  sabores: Sabor[] = [];
  quantidades: { [key: number]: number } = {};
  selectedDeliveryMethod: string | null = null;
  itensCarrinho: any[] = [];
  subtotal: number = 0;
  total: number = 0;
  mensagemErro: string | null = null;
  mensagemErroEndereco: string | null = null;
  endereco: string = '';
  complemento: string = '';

  constructor(
    private location: Location, 
    private saborService: SaborService, 
    private carrinhoService: CarrinhoService,
    private router: Router,
    private userService: UserService // Injete o UserService
  ) {}

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
    this.atualizarSubtotal();
    this.recuperarEnderecoEComplemento();
  }

  atualizarSubtotal(): void {
    this.subtotal = this.carrinhoService.calcularSubtotalCarrinho();
    this.atualizarTotal();
  }

  atualizarTotal(): void {
    if (this.selectedDeliveryMethod === 'receber') {
      this.total = this.subtotal + 11.90;
    } else {
      this.total = this.subtotal;
    }
  }

  aumentarQuantidade(saborId: number): void {
    const item = this.itensCarrinho.find(i => i.saborId === saborId);
    if (item) {
      this.carrinhoService.atualizarQuantidade(saborId, item.quantidade + 1);
      this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
      this.atualizarSubtotal();
    }
  }

  diminuirQuantidade(saborId: number): void {
    const item = this.itensCarrinho.find(i => i.saborId === saborId);
    if (item && item.quantidade > 1) {
      this.carrinhoService.atualizarQuantidade(saborId, item.quantidade - 1);
      this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
      this.atualizarSubtotal();
    }
  }

  removerDoCarrinho(saborId: number): void {
    this.carrinhoService.removerDoCarrinho(saborId);
    this.itensCarrinho = this.carrinhoService.obterItensCarrinho();
    this.atualizarSubtotal();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  selecionarFormaDeEntrega(metodo: string): void {
    this.selectedDeliveryMethod = metodo;
    this.mensagemErro = null;
    this.mensagemErroEndereco = null;
    this.atualizarTotal();
    localStorage.setItem('selectedDeliveryMethod', metodo); // Salva a seleção no localStorage
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

  recuperarEnderecoEComplemento(): void {
    const endereco = localStorage.getItem('endereco');
    const complemento = localStorage.getItem('complemento');
    if (endereco) {
      this.endereco = endereco;
    }
    if (complemento) {
      this.complemento = complemento;
    }
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
      return;
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
        return;
      }
    }
  
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  
    this.router.navigate(['/compra'], { 
      queryParams: { 
        endereco: this.endereco, 
        complemento: this.complemento, 
        deliveryMethod: this.selectedDeliveryMethod, 
        subtotal: this.subtotal, 
        total: this.total 
      } 
    });
  }

  onEnderecoChange(): void {
    localStorage.setItem('endereco', this.endereco);
  }

  onComplementoChange(): void {
    localStorage.setItem('complemento', this.complemento);
  }
}