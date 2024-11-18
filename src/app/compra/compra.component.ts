import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaborService } from '../services/sabor.service';
import { Sabor } from '../models/sabor.model';
import { Location, CommonModule } from '@angular/common';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {
  sabores: Sabor[] = [];
  selectedPaymentMethod: string | null = null;

  constructor(
    private location: Location, 
    private saborService: SaborService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sabores = this.saborService.getSabores();
  }

  goBack(): void {
    this.location.back();
  }

  selecionarFormaDePagamento(metodo: string): void {
    this.selectedPaymentMethod = metodo;
  }

  finalizarPedido(): void {
    this.router.navigate(['/compra']);
  }

}