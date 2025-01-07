import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Página de login
  { path: 'cadastro', component: CadastroComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redireciona para login por padrão
  { path: '**', redirectTo: 'login' }, // Redireciona rotas inválidas
];
