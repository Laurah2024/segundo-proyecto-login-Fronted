import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth/register';
  private apiUrlLogin = 'http://localhost:8080/api/auth/authenticate';

  constructor(private http: HttpClient) { }

  // método para registrar un usuario.
  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    return this.http.post(this.apiUrl, userData, { headers, responseType: 'text' });
  }

  // Método para iniciar sesión (login)
  loginUser(userData: any): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrlLogin, userData, { headers, responseType: 'text' }); // Cambié la respuesta a tipo texto
  }

  // Guardar el token JWT en localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Obtener el token JWT desde localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Eliminar el token (logout)
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}