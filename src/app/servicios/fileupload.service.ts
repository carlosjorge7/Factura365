import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  API = 'http://localhost/tecinvoice/rest_api_invoice/';

  constructor(public http: HttpClient) { }

  uploadFile(archivo) {
    return this.http.post(`${this.API}subirArchivo.php`, JSON.stringify(archivo));
  }
}
