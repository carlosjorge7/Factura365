import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllCategorias(OrganizationID: number | string) {
    return this.http.get(`${this.API}/category/a_category_list.php?OrganizationID=${OrganizationID}`);
  }

  createCategoria(categoria) {
    return this.http.post(`${this.API}/category/a_category_add.php`, JSON.stringify(categoria));
  }

  deleteCategoria(CategoryID: number | string) {
    return this.http.get(`${this.API}/category/a_category_id.php?CategoryID=${CategoryID}`);
  }

  getCategoria(CategoryID: number | string) {
    return this.http.get(`${this.API}/category/a_category_list_one.php?CategoryID=${CategoryID}`);
  }

  updateCategoria(categoria) {
    return this.http.post(`${this.API}/category/a_category_update.php`, JSON.stringify(categoria));
  }

  getCategoriasNombres(OrganizationID: number | string){
    return this.http.get(`${this.API}/category/a_category_list_names.php?OrganizationID=${OrganizationID}`);
  }

  getCategoriasParents(OrganizationID: number | string){
    return this.http.get(`${this.API}/category/a_category_list_parents.php?OrganizationID=${OrganizationID}`);
  }



}
