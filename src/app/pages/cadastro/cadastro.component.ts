import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  imports: [FormsModule],
})
export class CadastroComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.authService.signup(user).subscribe(
      (response: any) => {
        console.log('Cadastro realizado com sucesso:', response);
        this.router.navigate(['/login']); // Redireciona para a página de login
      },
      (error: any) => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
