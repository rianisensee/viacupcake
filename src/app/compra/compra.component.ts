import { Component, OnInit } from '@angular/core';
import { SaborService } from '../services/sabor.service';
import { Sabor } from '../models/sabor.model';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {
  sabores: Sabor[] = [];

  constructor(private saborService: SaborService) {}

  ngOnInit(): void {
    this.sabores = this.saborService.getSabores();
  }
}
