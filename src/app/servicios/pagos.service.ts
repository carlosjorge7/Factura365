import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllTerminos(OrganizationID: number | string) {
    return this.http.get(`${this.API}/term/a_term_list.php?OrganizationID=${OrganizationID}`);
  }

  createTermino(termino) {
    return this.http.post(`${this.API}/term/a_term_add.php`, JSON.stringify(termino));
  }

  deleteTermino(TermID: number | string) {
    return this.http.get(`${this.API}/term/a_term_id.php?TermID=${TermID}`);
  }

  getTermino(TermID: number | string) {
    return this.http.get(`${this.API}/term/a_term_list_one.php?TermID=${TermID}`);
  }

  updateTermino(termino) {
    return this.http.post(`${this.API}/term/a_term_update.php`, JSON.stringify(termino));
  }

  getTerminosNombres(OrganizationID: number | string){
    return this.http.get(`${this.API}/term/a_term_list_names.php?OrganizationID=${OrganizationID}`);
  }

}
