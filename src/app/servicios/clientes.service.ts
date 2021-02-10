import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllClientes(OrganizationID: number | string, CustomerStatus: string) {
    return this.http.get(`${this.API}/customer/a_customer_list.php?OrganizationID=${OrganizationID}&CustomerStatus=${CustomerStatus}`);
  }

  getCliente(CustomerID: number | string) {
    return this.http.get(`${this.API}/customer/a_customer_list_one.php?CustomerID=${CustomerID}`);
  }

  createCliente(cliente) {
    return this.http.post(`${this.API}/customer/a_customer_add.php`, JSON.stringify(cliente));
  }

  deleteCliente(proceso: string, OrganizationID: string | number, CustomerID: number | string) {
    return this.http.get(`${this.API}/customer/a_customer_id.php?proceso=${proceso}&OrganizationID=${OrganizationID}&CustomerID=${CustomerID}`);
  }
 
  updateCliente(cliente) {
    return this.http.post(`${this.API}/customer/a_customer_update.php`, JSON.stringify(cliente));
  }

  getClientesNombres(OrganizationID: number | string ){
    return this.http.get(`${this.API}/customer/a_customer_list_names.php?OrganizationID=${OrganizationID}`);
  }

  // Nombre
  setCustomerName(customerName: string) {
    localStorage.setItem('customerName', customerName);
  }

  getCustomerName() {
    return localStorage.getItem('customerName');
  }

  deleteCustomerName(){
    localStorage.removeItem('customerName');
  }


}
