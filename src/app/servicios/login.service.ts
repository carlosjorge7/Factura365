import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API = 'http://localhost/tecinvoice/rest_api_invoice';

  constructor(public http: HttpClient) { }

  login(usuario) {
    return this.http.post(`${this.API}/a_login.php`, JSON.stringify(usuario));
  } 
  
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLogginIn() {
    var usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }

  register(usuario){
    return this.http.post(`${this.API}/a_register.php`, JSON.stringify(usuario));
  }

  sendWelcome(Email: string, UsuarioName: string) {
    return this.http.get(`${this.API}/src/send_welcome.php?Email=${Email}&UsuarioName=${UsuarioName}`);
  }



}
