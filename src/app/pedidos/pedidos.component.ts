import { Component, OnInit } from '@angular/core';
import { SaborService } from '../services/sabor.service';
import { Sabor } from '../models/sabor.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  sabores: Sabor[] = [];

  constructor(private saborService: SaborService, private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.sabores = this.saborService.getSabores();
  }
}


