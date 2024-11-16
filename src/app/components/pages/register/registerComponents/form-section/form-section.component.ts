import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SweetalertService } from 'src/app/sweetalert.service';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css']
})
export class FormSectionComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef, private authService: AuthService, private sweetalertService: SweetalertService) { }

  ngAfterViewInit(): void {
    this.removeSplineLogo();
  }

  private removeSplineLogo(): void {
    const splineViewer = this.el.nativeElement.querySelector('spline-viewer');

    if (splineViewer) {
      const interval = setInterval(() => {
        const shadowRoot = splineViewer.shadowRoot;
        const logoElement = shadowRoot?.querySelector('#logo');

        if (logoElement) {
          this.renderer.removeChild(shadowRoot, logoElement);
          clearInterval(interval); // Detén la verificación una vez que el logo se haya eliminado
        }
      }, 500); // Verifica cada 500ms
    }
  }

  user = {
    nombre: '',
    apellido: '',
    birthday: '',
    email: '',
    password: ''
  };

  // Método para manejar el registro.
  onRegister() {
    this.authService.registerUser(this.user).subscribe({
      next: (response: any) => {
        console.log('Usuario registrado:', response);
        this.sweetalertService.showSuccessWithRedirect('Usuario creado correctamente. ¿Te gustaría iniciar sesión?');
      },
      error: (error: any) => {
        console.error('Error en el registro:', error);
        if (error.status === 409) {
          this.sweetalertService.showError(error.error || 'El correo electrónico ya está registrado.');
        } else if (error.status === 400) {
          this.sweetalertService.showError(error.error || 'Hay campos obligatorios vacíos o datos inválidos.');
        } else {
          this.sweetalertService.showError("No se pudo crear el usuario.");
        }
      }
    });
  }

}