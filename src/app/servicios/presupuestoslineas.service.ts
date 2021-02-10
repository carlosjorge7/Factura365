import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoslineasService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/src';

  constructor(public http: HttpClient) { }

  getAllPresupuestosLineas(EstimateID: number | string) {
    return this.http.get(`${this.API}/estimate-line/a_estimateline_list.php?EstimateID=${EstimateID}`);
  }

  createPresupuestoLinea(linea) {
    return this.http.post(`${this.API}/estimate-line/a_estimateline_add.php`, JSON.stringify(linea));
  }

  deletePresupuestoLinea(Estimate_LineID: number | string) {
    return this.http.get(`${this.API}/estimate-line/a_estimateline_id.php?Estimate_LineID=${Estimate_LineID}`);
  }

  getPresupuestoLinea(Estimate_LineID: number | string) {
    return this.http.get(`${this.API}/estimate-line/a_estimateline_list_one.php?Estimate_LineID=${Estimate_LineID}`);
  }

  updatePresupuestoLinea(linea) {
    return this.http.post(`${this.API}/estimate-line/a_estimateline_update.php`, JSON.stringify(linea));
  }
}
