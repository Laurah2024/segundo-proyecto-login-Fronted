import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SweetalertService } from 'src/app/sweetalert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private sweetalertService: SweetalertService, private router: Router) { }

  // Método para manejar el login.
  onLogin() {
    this.authService.loginUser(this.user).subscribe({
      next: (token: string) => { 
        this.authService.saveToken(token);
        this.sweetalertService.showSuccessLogin('Login exitoso. ¿Te gustaría ir a las novedades?');
      },
      error: (error: any) => {
        console.error('Error en el login:', error);
        if (error.status === 401) {
          this.sweetalertService.showError(error.error || 'Credenciales incorrectas.');
        } else {
          this.sweetalertService.showError(error.message);
        }
      }
    });
  }
}
