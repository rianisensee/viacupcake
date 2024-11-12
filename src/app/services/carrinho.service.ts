import { Injectable } from '@angular/core';
import { SaborService } from './sabor.service';
import { Carrinho, CarrinhoItem } from '../models/carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinho: Carrinho = { itens: [] };

  constructor(private saborService: SaborService) {}

  // Método para adicionar um item ao carrinho
  adicionarAoCarrinho(saborId: number, quantidade: number): void {
    // Verifica se o item já está no carrinho
    const itemExistente = this.carrinho.itens.find(item => item.saborId === saborId);
    
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      // Adiciona um novo item ao carrinho
      this.carrinho.itens.push({ saborId, quantidade });
    }
  }

  // Método para remover um item do carrinho
  removerDoCarrinho(saborId: number): void {
    this.carrinho.itens = this.carrinho.itens.filter(item => item.saborId !== saborId);
  }

  // Método para atualizar a quantidade de um item no carrinho
  atualizarQuantidade(saborId: number, quantidade: number): void {
    const itemExistente = this.carrinho.itens.find(item => item.saborId === saborId);

    if (itemExistente) {
      if (quantidade <= 0) {
        this.removerDoCarrinho(saborId);  // Se a quantidade for 0 ou negativa, remove o item
      } else {
        itemExistente.quantidade = quantidade;
      }
    }
  }

  // Método para obter todos os itens do carrinho com as informações do sabor
  obterItensCarrinho(): any[] {
    return this.carrinho.itens.map(item => {
      const sabor = this.saborService.getSaborById(item.saborId);
      return {
        ...item,
        titulo: sabor.titulo,
        preco: sabor.preco
      };
    });
  }

  // Método para calcular o preço total do carrinho
  calcularTotalCarrinho(): number {
    return this.carrinho.itens.reduce((total, item) => {
      const sabor = this.saborService.getSaborById(item.saborId);
      return total + (sabor.preco * item.quantidade);
    }, 0);
  }
  
  obterTotalItens(): number {
    return this.carrinho.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  // Método para limpar o carrinho (remover todos os itens)
  limparCarrinho(): void {
    this.carrinho.itens = [];
  }
}
