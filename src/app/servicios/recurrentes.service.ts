import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecurrentesService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllRecurrentes(OrganizationID: number | string) {
    return this.http.get(`${this.API}/recurring/a_recurring_list.php?OrganizationID=${OrganizationID}`);
  }

  createRecurrente(recurrente) {
    return this.http.post(`${this.API}/recurring/a_recurring_add.php`, JSON.stringify(recurrente));
  }

  getRecurrente(RecurringID: number | string) {
    return this.http.get(`${this.API}/recurring/a_recurring_list_one.php?RecurringID=${RecurringID}`);
  }

  // Cuando borro una recurrente, borro la cabecera con el RecurringID, la factura y las lineas con el InvoiceID
  deleteRecurrente(InvoiceID: number | string, RecurringID: string | number) {
    return this.http.get(`${this.API}/recurring/a_recurring_id.php?InvoiceID=${InvoiceID}&RecurringID=${RecurringID}`);
  }

  updateRecurrente(recurrente) {
    return this.http.post(`${this.API}/recurring/a_recurring_update.php`, JSON.stringify(recurrente));
  }
  
}
