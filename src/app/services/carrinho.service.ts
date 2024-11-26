import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SaborService } from './sabor.service';

interface ItemCarrinho {
  saborId: number;
  quantidade: number;
}

interface Sabor {
  id: number;
  titulo: string;
  preco: number;
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private storageKey = 'itensCarrinho';
  private itensCarrinhoSubject = new BehaviorSubject<any[]>([]);
  itensCarrinho$ = this.itensCarrinhoSubject.asObservable();

  constructor(private saborService: SaborService) {
    const itens = this.obterItensCarrinho();
    this.itensCarrinhoSubject.next(itens);
  }

  obterItensCarrinho(): any[] {
    const itens = localStorage.getItem(this.storageKey);
    const itensCarrinho: ItemCarrinho[] = itens ? JSON.parse(itens) : [];

    return itensCarrinho.map((item: ItemCarrinho) => {
      const sabor: Sabor = this.saborService.getSaborById(item.saborId);
      return {
        ...item,
        titulo: sabor.titulo,
        preco: sabor.preco,
        imagem: sabor.imagem
      };
    });
  }

  atualizarItensCarrinho(itens: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(itens));
    this.itensCarrinhoSubject.next(itens);
  }

  adicionarAoCarrinho(saborId: number, quantidade: number): void {
    const itens = this.obterItensCarrinho();
    const itemExistente = itens.find(item => item.saborId === saborId);

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      itens.push({ saborId, quantidade });
    }

    this.atualizarItensCarrinho(itens);
  }

  atualizarQuantidade(saborId: number, quantidade: number): void {
    const itens = this.obterItensCarrinho();
    const item = itens.find(i => i.saborId === saborId);
    if (item) {
      item.quantidade = quantidade;
      this.atualizarItensCarrinho(itens);
    }
  }

  removerDoCarrinho(saborId: number): void {
    let itens = this.obterItensCarrinho();
    itens = itens.filter(i => i.saborId !== saborId);
    this.atualizarItensCarrinho(itens);
  }

  calcularSubtotalCarrinho(): number {
    const itens = this.obterItensCarrinho();
    return itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }

  limparCarrinho(): void {
    localStorage.removeItem(this.storageKey);
    this.itensCarrinhoSubject.next([]);
  }

  obterTotalItens(): number {
    const itens = this.obterItensCarrinho();
    return itens.reduce((total, item) => total + item.quantidade, 0);
  }
}