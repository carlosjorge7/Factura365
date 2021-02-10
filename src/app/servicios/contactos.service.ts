import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllContactos(OrganizationID: number | string) {
    return this.http.get(`${this.API}/contact/a_contact_list.php?OrganizationID=${OrganizationID}`);
  }

  getContacto(ContactID: number | string) {
    return this.http.get(`${this.API}/contact/a_contact_list_one.php?ContactID=${ContactID}`);
  }

  createContacto(contacto) {
    return this.http.post(`${this.API}/contact/a_contact_add.php`, JSON.stringify(contacto));
  }

  deleteContacto(ContactID: number | string) {
    return this.http.get(`${this.API}/contact/a_contact_id.php?ContactID=${ContactID}`);
  }

  updateContacto(contacto) {
    return this.http.post(`${this.API}/contact/a_contact_update.php`, JSON.stringify(contacto));
  }


}
