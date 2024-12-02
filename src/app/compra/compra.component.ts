import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SaborService } from '../services/sabor.service';
import { Sabor } from '../models/sabor.model';
import { Location, CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { CarrinhoService } from '../services/carrinho.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  sabores: Sabor[] = [];
  selectedPaymentMethod: string | null = null;
  showAlert: boolean = false;
  alertMessage: string = '';
  itensCompra: any[] = [];
  subtotal: number = 0;
  total: number = 0;
  endereco: string | null = null;
  complemento: string | null = null;
  deliveryMethod: string | null = null;
  mensagemErro: string | null = null;
  mensagemErroEndereco: string | null = null;

  constructor(
    private location: Location, 
    private saborService: SaborService,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.sabores = this.saborService.getSabores();
    this.itensCompra = this.carrinhoService.obterItensCarrinho();
    this.atualizarSubtotal();

    this.route.queryParams.subscribe(params => {
      this.endereco = params['endereco'] || localStorage.getItem('endereco') || null;
      this.complemento = params['complemento'] || localStorage.getItem('complemento') || null;
      this.deliveryMethod = params['deliveryMethod'] || null;
      this.subtotal = +params['subtotal'] || 0;
      this.total = +params['total'] || 0;
    });
  }

  atualizarSubtotal(): void {
    this.subtotal = this.carrinhoService.calcularSubtotalCarrinho();
    this.atualizarTotal();
  }

  atualizarTotal(): void {
    this.total = this.subtotal;
  }

  goBack(): void {
    this.router.navigate(['/carrinho']);
  }

  selecionarFormaDePagamento(metodo: string): void {
    this.selectedPaymentMethod = metodo;
    this.mensagemErro = null;
    this.mensagemErroEndereco = null;
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      if (metodo === 'credit') {
        const addressFormElement = document.querySelector('.address-form');
        if (addressFormElement) {
          addressFormElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 0);
  }

  finalizarPedido(): void {
    if (!this.selectedPaymentMethod) {
        this.mensagemErro = 'Selecione uma forma de pagamento';
        setTimeout(() => {
            const errorMessageElement = document.getElementById('errorMessage');
            if (errorMessageElement) {
                errorMessageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 0);
        return;
    } else {
        const deliveryFee = this.deliveryMethod === 'receber' ? 11.90 : 0;
        const order: Order = {
            id: 0,
            numero: '',
            saborId: this.itensCompra[0].saborId,
            quantidade: this.itensCompra[0].quantidade,
            itemPrice: this.itensCompra[0].preco * this.itensCompra[0].quantidade,
            subtotal: this.subtotal,
            deliveryMethod: this.deliveryMethod!,
            endereco: this.endereco || undefined,
            complemento: this.complemento || undefined,
            deliveryFee: deliveryFee ? `Taxa de entrega: R$ ${deliveryFee.toFixed(2)}` : undefined,
            total: this.total + deliveryFee,
            selectedPaymentMethod: this.selectedPaymentMethod!,
            date: new Date(),
            itensCompra: this.itensCompra
        };

        this.orderService.createOrder(order);

        // Remover todos os itens do carrinho
        this.carrinhoService.limparCarrinho();

        this.alertMessage = 'Pedido efetuado com sucesso!';
        this.showAlert = true;
    }
}

  closeAlert(): void {
    this.showAlert = false;
    this.router.navigate(['/']);
  }

  getFormattedTitle(title: string): string[] {
    const maxLength = 18;
    if (title.length <= maxLength) {
      return ["Cupcake "+title];
    }
  
    const words = title.split(' ');
    let firstLine = 'Cupcake';
    let secondLine = '';
  
    for (let word of words) {
      if ((firstLine + ' ' + word).length <= maxLength) {
        firstLine += ' ' + word;
      } else {
        secondLine += word + ' ';
      }
    }
  
    return [firstLine.trim(), secondLine.trim()];
  }

  onEnderecoChange(value: string): void {
    this.endereco = value;
    localStorage.setItem('endereco', value);
  }

  onComplementoChange(value: string): void {
    this.complemento = value;
    localStorage.setItem('complemento', value);
  }
}