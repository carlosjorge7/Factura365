import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuorgService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllUsuorg(UsuarioID: number | string, OrganizationID: number | string) {
    return this.http.get(`${this.API}/usuorg/a_usuorg_list.php?UsuarioID=${UsuarioID}&OrganizationID=${OrganizationID}`);
  }

  createUsuorg(usuorg) {
    return this.http.post(`${this.API}/usuorg/a_usuorg_add.php`, JSON.stringify(usuorg));
  }

  deleteUsuorg(proceso: string, OrganizationID: string | number, Usuario_OrganizationID: string | number) {
    return this.http.get(`${this.API}/usuorg/a_usuorg_id.php?proceso=${proceso}&OrganizationID=${OrganizationID}&Usuario_OrganizationID=${Usuario_OrganizationID}`);
  }

  getUsuorg(Usuario_OrganizationID: number | string) {
    return this.http.get(`${this.API}/usuorg/a_usuorg_list_one.php?Usuario_OrganizationID=${Usuario_OrganizationID}`);
  }

  updateUsuorg(usuorg) {
    return this.http.post(`${this.API}/usuorg/a_usuorg_update.php`, JSON.stringify(usuorg));
  }


}
