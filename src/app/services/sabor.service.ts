import { Injectable } from '@angular/core';
import { Sabor } from '../models/sabor.model';

@Injectable({
  providedIn: 'root'
})
export class SaborService {
  private sabores: Sabor[] = [
    { id: 1, titulo: 'Red Velvet', preco: 9.90, imagem: 'assets/images/redvelvet.png' },
    { id: 2, titulo: 'Chocolate Belga', preco: 11.50, imagem: 'assets/images/chocolatebelga.png' },
    { id: 3, titulo: 'Tiramisu', preco: 10.90, imagem: 'assets/images/tiramisu.png' },
    { id: 4, titulo: 'Limão', preco: 9.50, imagem: 'assets/images/limao.png' },
    { id: 5, titulo: 'Pistache', preco: 11.90, imagem: 'assets/images/pistache.png' },
    { id: 6, titulo: 'Baunilha', preco: 9.90, imagem: 'assets/images/baunilha.png' },
    { id: 7, titulo: 'Chocolate Branco e Morango', preco: 10.90, imagem: 'assets/images/chocolatebrancomorango.png' },
    { id: 8, titulo: 'Amendoim e Geleia de Morango', preco: 10.50, imagem: 'assets/images/amendoim.png' },
    { id: 9, titulo: 'Oreo', preco: 9.90, imagem: 'assets/images/oreo.png' },
    { id: 10, titulo: 'Choco Duo', preco: 10.50, imagem: 'assets/images/chocoduo.png' },
    { id: 11, titulo: 'Morango', preco: 9.50, imagem: 'assets/images/morango.png' },
    { id: 12, titulo: 'Chocolate Meio-Amargo', preco: 10.90, imagem: 'assets/images/chocolatemeioamargo.png' },
    { id: 13, titulo: 'Caramelo Salgado', preco: 9.90, imagem: 'assets/images/caramelo.png' },
    { id: 14, titulo: 'Nozes', preco: 11.50, imagem: 'assets/images/nozes.png' },
    { id: 15, titulo: 'Maracujá', preco: 9.50, imagem: 'assets/images/maracuja.png' },
    { id: 16, titulo: 'Cenoura', preco: 10.50, imagem: 'assets/images/cenoura.png' }
  ];

  getSabores(): Sabor[] {
    return [...this.sabores];
  }

  addSabor(sabor: Sabor): void {
    this.sabores.push(sabor);
  }

  updateSabor(id: number, updatedSabor: Partial<Sabor>): void {
    const index = this.sabores.findIndex(s => s.id === id);
    if (index !== -1) {
      this.sabores[index] = { ...this.sabores[index], ...updatedSabor };
    }
  }

  deleteSabor(id: number): void {
    this.sabores = this.sabores.filter(s => s.id !== id);
  }

  getSaborById(id: number): Sabor {
    return this.sabores.find(sabor => sabor.id === id)!;
  }
}
 
