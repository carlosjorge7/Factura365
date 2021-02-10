import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllProductos(OrganizationID: number | string, ProductStatus: string) {
    return this.http.get(`${this.API}/product/a_product_list.php?OrganizationID=${OrganizationID}&ProductStatus=${ProductStatus}`);
  }

  getProducto(ProductID: number | string) {
    return this.http.get(`${this.API}/product/a_product_list_one.php?ProductID=${ProductID}`);
  }

  createProducto(producto) {
    return this.http.post(`${this.API}/product/a_product_add.php`, JSON.stringify(producto));
  }

  deleteProducto(proceso: string, OrganizationID: number | string, ProductID: number | string) {
    return this.http.get(`${this.API}/product/a_product_id.php?proceso=${proceso}&OrganizationID=${OrganizationID}&ProductID=${ProductID}`);
  }

  updateProducto(producto) {
    return this.http.post(`${this.API}/product/a_product_update.php`, JSON.stringify(producto));
  }

  getProductosNombres(OrganizationID: string | number){
    return this.http.get(`${this.API}/product/a_product_list_names.php?OrganizationID=${OrganizationID}`);
  }

}
