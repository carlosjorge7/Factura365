import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImpuestosService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllImpuestos(OrganizationID: number | string) {
    return this.http.get(`${this.API}/taxes/a_tax_list.php?OrganizationID=${OrganizationID}`);
  }
  
  getImpuesto(TaxID: number | string) {
    return this.http.get(`${this.API}/taxes/a_tax_list_one.php?TaxID=${TaxID}`);
  }

  createImpuesto(impuesto) {
    return this.http.post(`${this.API}/taxes/a_tax_add.php`, JSON.stringify(impuesto));
  }

  deleteImpuesto(TaxID: number | string) {
    return this.http.get(`${this.API}/taxes/a_tax_id.php?TaxID=${TaxID}`);
  }

  updateImpuesto(impuesto) {
    return this.http.post(`${this.API}/taxes/a_tax_update.php`, JSON.stringify(impuesto));
  }

  getImpuestosPorcentajes(OrganizationID: number | string ){
    return this.http.get(`${this.API}/taxes/a_tax_list_names.php?OrganizationID=${OrganizationID}`);
  }
}
