import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturaslineasService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllFacturasLineas(InvoiceID: number | string) {
    return this.http.get(`${this.API}/invoice-line/a_invoiceline_list.php?InvoiceID=${InvoiceID}`);
  }

  createFacturaLinea(linea) {
    return this.http.post(`${this.API}/invoice-line/a_invoiceline_add.php`, JSON.stringify(linea));
  }

  deleteFacturaLinea(Invoice_LineID: number | string) {
    return this.http.get(`${this.API}/invoice-line/a_invoiceline_id.php?Invoice_LineID=${Invoice_LineID}`);
  }

  getFacturaLinea(Invoice_LineID: number | string) {
    return this.http.get(`${this.API}/invoice-line/a_invoiceline_list_one.php?Invoice_LineID=${Invoice_LineID}`);
  }

  updateFacturaLinea(linea) {
    return this.http.post(`${this.API}/invoice-line/a_invoiceline_update.php`, JSON.stringify(linea));
  }

}
