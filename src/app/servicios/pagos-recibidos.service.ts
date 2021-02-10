import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagosRecibidosService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllPagosRecibidos(OrganizationID: number | string, CustomerID: string | number) {
    return this.http.get(`${this.API}/payment/a_payment_list.php?OrganizationID=${OrganizationID}&CustomerID=${CustomerID}`);
  }

  createPagoRecibido(pagorecibido) {
    return this.http.post(`${this.API}/payment/a_payment_add.php`, JSON.stringify(pagorecibido));
  }

  deletePagoRecibido(PaymentID: number | string) {
    return this.http.get(`${this.API}/payment/a_payment_id.php?PaymentID=${PaymentID}`);
  }

  getPagoRecibido(PaymentID: number | string) {
    return this.http.get(`${this.API}/payment/a_payment_list_one.php?PaymentID=${PaymentID}`);
  }

  updatePagoRecibido(pagorecibido) {
    return this.http.post(`${this.API}/payment/a_payment_update.php`, JSON.stringify(pagorecibido));
  }

  getMetodosPagoNombres(){
    return this.http.get(`${this.API}/payment/a_payment_metodos_pago.php`);
  }

  getAllFacturasByCliente(OrganizationID: string | number, CustomerID: string | number){
    return this.http.get(`${this.API}/payment/a_payment_list_invoice.php?OrganizationID=${OrganizationID}&CustomerID=${CustomerID}`);
  }

}
