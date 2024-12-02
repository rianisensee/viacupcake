import { Component, OnInit } from '@angular/core';
import { SaborService } from '../services/sabor.service';
import { OrderService } from '../services/order.service';
import { Sabor } from '../models/sabor.model';
import { Order } from '../models/order.model';
import { Location, CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PedidosComponent implements OnInit {
  sabores: Sabor[] = [];
  orders: Order[] = [];

  constructor(
    private saborService: SaborService,
    private orderService: OrderService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.sabores = this.saborService.getSabores();
    this.orders = this.orderService.getOrders().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}