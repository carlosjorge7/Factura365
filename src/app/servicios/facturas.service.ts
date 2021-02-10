import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllFacturas(OrganizationID: number | string, CustomerID: number | string, InvoiceType: string | number, InvoiceDateFrom: string | number, InvoiceDateTo: string | number, InvoiceStatus: string | number) {
    return this.http.get(`${this.API}/invoice/a_invoice_list.php?OrganizationID=${OrganizationID}&CustomerID=${CustomerID}&InvoiceType=${InvoiceType}&InvoiceDateFrom=${InvoiceDateFrom}&InvoiceDateTo=${InvoiceDateTo}&InvoiceStatus=${InvoiceStatus}`);
  }

  createFactura(factura) {
    return this.http.post(`${this.API}/invoice/a_invoice_add.php`, JSON.stringify(factura));
  }

  deleteFactura(InvoiceID: number | string) {
    return this.http.get(`${this.API}/invoice/a_invoice_id.php?InvoiceID=${InvoiceID}`);
  }

  getFactura(InvoiceID: number | string) {
    return this.http.get(`${this.API}/invoice/a_invoice_list_one.php?InvoiceID=${InvoiceID}`);
  }

  updateFactura(factura) {
    return this.http.post(`${this.API}/invoice/a_invoice_update.php`, JSON.stringify(factura));
  }

  calcularFactura(InvoiceID: number | string) {
    return this.http.get(`${this.API}/invoice/a_inv_calc.php?InvoiceID=${InvoiceID}`);
  }

  // para combos: METER CLIENTE
  getFacturasNombres(OrganizationID: string | number) {
    return this.http.get(`${this.API}/invoice/a_invoice_list_names.php?OrganizationID=${OrganizationID}`);
  }

  uploadInvoice_To_Azure(InvoiceID: number | string) {
    return this.http.get(`http://localhost/tecinvoice/rest_api_invoice/a_report_invoice.php?InvoiceID=${InvoiceID}`);
  }

  getInvoiceURL(InvoiceID: string | number){
    return this.http.get(`${this.API}/invoice/a_invoice_get_url.php?InvoiceID=${InvoiceID}`);
  }

  sendInvoice(OrganizationName: string, CustomerName: string, Email: string, InvoiceNumber: string, FileName: string, urlpdf: string) {
    return this.http.get(`${this.API}/send_invoice.php?OrganizationName=${OrganizationName}&CustomerName=${CustomerName}&Email=${Email}&InvoiceNumber=${InvoiceNumber}&FileName=${FileName}&urlpdf=${urlpdf}`);
  }

  setID(invoiceID: string) {
    localStorage.setItem('invoiceID', invoiceID);
  }

  getID() {
    return localStorage.getItem('invoiceID');
  }

  deleteID(){
    localStorage.removeItem('invoiceID');
  }


  setRandom(Random: string) {
    localStorage.setItem('Random', Random);
  }

  getRandom() {
    return localStorage.getItem('Random');
  }

  deleteRandom(){
    localStorage.removeItem('Random');
  }

  getInvoiceNumber(){
    return localStorage.getItem('invoiceNumber');
  }

  setInvoiceNumber(invoiceNumber: string) {
    localStorage.setItem('invoiceNumber', invoiceNumber);
  }

  deleteInvoiceNumber(){
    localStorage.removeItem('invoiceNumber');
  }

  // A la hora de actualizar linea, por si quiero añadir una linea nueva
  getFlagger(){
    return localStorage.getItem('res');
  }

  setFlagger(res: string){
    localStorage.setItem('res', res);
  }

  
  deleteFlagger(){
    localStorage.removeItem('res');
  }

  //
   // A la hora de actualizar linea, por si quiero añadir una linea nueva
  getFlaggerUpd(){
    return localStorage.getItem('res');
  }

  setFlaggerUpd(res: string){
    localStorage.setItem('res', res);
  }

  
  deleteFlaggerUpd(){
    localStorage.removeItem('res');
  }

  // url 
  setUrl(url: string) {
    localStorage.setItem('url', url);
  }

  getUrl() {
    return localStorage.getItem('url');
  }

  deleteUrl(){
    localStorage.removeItem('url');
  }

  // filename
  setFilename(filename: string) {
    localStorage.setItem('filename', filename);
  }

  getFilename() {
    return localStorage.getItem('filename');
  }

  deleteFilename(){
    localStorage.removeItem('filename');
  }

  // email
  setEmail(email: string) {
    localStorage.setItem('email', email);
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  deleteEmail(){
    localStorage.removeItem('email');
  }


}
