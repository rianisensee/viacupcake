import { Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { ContatoComponent } from './contato/contato.component';
import { HomeComponent } from './home/home.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { LoginComponent } from './login/login.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContaComponent } from './conta/conta.component';
import { CompraComponent } from './compra/compra.component';

export const appRoutes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: 'contato', component: ContatoComponent },
  { path: '', component: HomeComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'conta', component: ContaComponent },
  { path: 'compra', component: CompraComponent },
];
