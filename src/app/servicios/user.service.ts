import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API = 'http://localhost/tecinvoice/rest_api_invoice';

  constructor(public http: HttpClient) { }

  getUser(token: number | string) {
    return this.http.get(`${this.API}/a_user.php?UsuarioID=${token}`);
  }

  // Esto no se si lo uso
  setNombre(user: string) {
    localStorage.setItem('user', user);
  }

  getNombre() {
    return localStorage.getItem('user');
  }

  deleteNombre(){
    localStorage.removeItem('user');
  }

  updateUser(user){
    return this.http.post(`${this.API}/a_user_update.php`,  JSON.stringify(user));
  }

  eliminarCuenta(user){
    return this.http.post(`${this.API}/a_user_id.php`,  JSON.stringify(user));
  }
}
