import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllPresupuestos(OrganizationID: number | string, CustomerID: number | string, EstimateDateFrom: string | number, EstimateDateTo: string | number, EstimateStatus: string | number) {
    return this.http.get(`${this.API}/estimate/a_estimate_list.php?OrganizationID=${OrganizationID}&CustomerID=${CustomerID}&EstimateDateFrom=${EstimateDateFrom}&EstimateDateTo=${EstimateDateTo}&EstimateStatus=${EstimateStatus}`);
  }

  createPresupuesto(presupuesto) {
    return this.http.post(`${this.API}/estimate/a_estimate_add.php`, JSON.stringify(presupuesto));
  }

  deletePresupuesto(EstimateID: number | string) {
    return this.http.get(`${this.API}/estimate/a_estimate_id.php?EstimateID=${EstimateID}`);
  }

  getPresupuesto(EstimateID: number | string) {
    return this.http.get(`${this.API}/estimate/a_estimate_list_one.php?EstimateID=${EstimateID}`);
  }

  updatePresupuesto(presupuesto) {
    return this.http.post(`${this.API}/estimate/a_estimate_update.php`, JSON.stringify(presupuesto));
  }

  calcularPresupuesto(EstimateID: number | string) {
    return this.http.get(`${this.API}/estimate/a_est_calc.php?EstimateID=${EstimateID}`);
  }

  
  setID(estimateID: string) {
    localStorage.setItem('estimateID', estimateID);
  }

  getID() {
    return localStorage.getItem('estimateID');
  }

  deleteID(){
    localStorage.removeItem('estimateID');
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

  getEstimateNumber(){
    return localStorage.getItem('estimateNumber');
  }

  setEstimateNumber(estimateNumber: string) {
    localStorage.setItem('estimateNumber', estimateNumber);
  }

  deleteEstimateNumber(){
    localStorage.removeItem('estimateNumber');
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
  
}
