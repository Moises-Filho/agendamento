import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common'; // Importe CommonModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response: { token: string }) => {
        // Supondo que o token seja retornado como `response.token`
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']); // Redirecione para a página principal após o login
      },
      error: (error: { error: { message: string } }) => {
        this.errorMessage = error.error.message || 'Erro ao realizar login';
      },
    });
  }

  goToSignup() {
    this.router.navigate(['/cadastro']);
  }
}
