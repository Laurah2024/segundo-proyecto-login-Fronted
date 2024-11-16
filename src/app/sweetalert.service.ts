import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor(private router: Router) { }

  showSuccessLogin(message: string) {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Sí, ir a novedades.',
      cancelButtonText: 'No.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/news']); 
      } else if (result.isDismissed) {
        this.router.navigate(['/home']); 
      }
    });
  }

  showSuccessWithRedirect(message: string) {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Sí, ir a iniciar sesión.',
      cancelButtonText: 'No.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }

  showError(message: string) {
    Swal.fire('Error en el registro:', message, 'error');
  }

}