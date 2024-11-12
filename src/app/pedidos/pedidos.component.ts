import { Component, OnInit } from '@angular/core';
import { SaborService } from '../services/sabor.service';
import { Sabor } from '../models/sabor.model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  sabores: Sabor[] = [];

  constructor(private saborService: SaborService) {}

  ngOnInit(): void {
    this.sabores = this.saborService.getSabores();
  }
}


