import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  public API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }
   
  getAllOrganizaciones(UsuarioID: number | string) {
    return this.http.get(`${this.API}/organization/a_organization_list.php?UsuarioID=${UsuarioID}`);
  }

  getOrganizacion(OrganizationID: number | string) {
    return this.http.get(`${this.API}/organization/a_organization_list_one.php?OrganizationID=${OrganizationID}`);
  }

  createOrganizacion(organizacion) {
    return this.http.post(`${this.API}/organization/a_organization_add.php`, JSON.stringify(organizacion));
  }

  deleteOrganizacion(proceso: string, UsuarioID: string | number, OrganizationID: number | string, OrganizationStatusCode) {
    return this.http.get(`${this.API}/organization/a_organization_id.php?proceso=${proceso}&UsuarioID=${UsuarioID}&OrganizationID=${OrganizationID}&OrganizationStatusCode=${OrganizationStatusCode}`);
  }

  updateOrganizacion(organizacion) {
    return this.http.post(`${this.API}/organization/a_organization_update.php`, JSON.stringify(organizacion));
  }

  getOrganizationID(token: number | string, OrganizationDefault: number | string){
    return this.http.get(`${this.API}/organization/a_organization_getId.php?UsuarioID=${token}&OrganizationDefault=${OrganizationDefault}`);
  }

  // ID
  setID(organizationID: string) {
    localStorage.setItem('organizationID', organizationID);
  }

  getID() {
    return localStorage.getItem('organizationID');
  }

  deleteID(){
    localStorage.removeItem('organizationID');
  }

  // Nombre
  setOrganizationNombre(organizationName: string) {
    localStorage.setItem('organizationName', organizationName);
  }

  getOrganizationName() {
    return localStorage.getItem('organizationName');
  }

  deleteOrganizationName(){
    localStorage.removeItem('organizationName');
  }


  getNombre(OrganizationID: number | string){
    return this.http.get(`${this.API}/organization/a_organization_getNombre.php?OrganizationID=${OrganizationID}`);
  }

  // Para el desplegable de Organizations y poder cambiar de organizacion
  getOrganizationNombres(token: string | number){
    return this.http.get(`${this.API}/organization/a_organization_list_names.php?UsuarioID=${token}`);
  }

}
