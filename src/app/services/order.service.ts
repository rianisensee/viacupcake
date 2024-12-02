import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private currentId: number = 1;

  constructor() {
    this.loadOrders();
  }

  private saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  private loadOrders(): void {
    const orders = localStorage.getItem('orders');
    if (orders) {
      this.orders = JSON.parse(orders);
      this.currentId = this.orders.length ? Math.max(...this.orders.map(order => order.id)) + 1 : 1;
    }
  }

  createOrder(order: Order): void {
    order.id = this.currentId++;
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const idStr = order.id.toString().padStart(2, '0');
    order.numero = `${year}${month}${day}${idStr}`;
    order.date = date;
    this.orders.push(order);
    this.saveOrders();
  }

  getOrders(): Order[] {
    return [...this.orders];
  }
}