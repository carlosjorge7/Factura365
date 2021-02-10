import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from '../../../servicios/organizacion.service';

import { OrganizacionComponent } from '../organizacion.component'

import { Router } from '@angular/router';

import { LoginService } from '../../../servicios/login.service';
import { CommonService } from '../../../servicios/common.service';

import { FileuploadService } from '../../../servicios/fileupload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-organizacion-add',
  templateUrl: './organizacion-add.component.html',
  styleUrls: ['./organizacion-add.component.css'],
  providers: [OrganizacionService, OrganizacionComponent]
})
export class OrganizacionAddComponent implements OnInit {

  // carga de imagen para la organizacion
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null
  }

  log: boolean = false;

  organizaciones = null;

  monedas = [];
  paises = [];

  org = {
    UsuarioID: this.loginService.getToken(),
    OrganizationName: null,
    CurrencyCode: null,
    CountryIso: null,
    LanguageIso: null,
    Address: null,
    Street2: null,
    City: null,
    State: null,
    PostalCode: null,
    OrganizationIdFiscal: null,
    InvoiceRoot: 'INV-',
    InvoiceLastNumber: '0',
    EstimateRoot: 'EST-',
    EstimateLastNumber: '0',
    CreditRoot: 'CRE-',
    CreditLastNumber: '0',
    OrganizationIBAN: null,
    OrganizationBank: null,
    OrganizationStatusCode: null,
    TermsConditionsInvoice: 'De acuerdo con la Ley Orgánica de Protección de Datos de carácter personal, le informamos que sus datos están incluidos en un archivo de titularidad de TECNOFUN DIGITAL, S.L., con el objetivo de mantener nuestras relaciones comerciales. Si desea ejercitar sus derechos de acceso, rectificación, cancelación y oposición, diríjase por escrito a TECNOFUN DIGITAL, S.L., Camino Perales, 35, 28232 LAS ROZAS, MADRID, España o por correo electrónico a jacinto.jorge@tecnofun.es',
    LogoUrl: null
  }

  constructor(public organizacionService: OrganizacionService, 
             public router: Router,
             public commonService: CommonService,
             public loginService: LoginService,
             public fileUploadService: FileuploadService) {
              this.monedas = this.commonService.monedas;
              this.paises = this.commonService.paises;
              }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
    }
    else{
      this.router.navigate(['/']);
    }
  }

  createOrganizacion() {
    var token = this.loginService.getToken();
    if(token != null){
      if(this.org.OrganizationName === '' || this.org.OrganizationName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else{
        this.org.OrganizationStatusCode = '200';
        this.organizacionService.createOrganizacion(this.org)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.organizacionService.getAllOrganizaciones(token);
              this.router.navigate(['/organizaciones']);
            }
          });
      }
     
    }
  }

  cancel(){
    this.router.navigate(['/organizaciones']);
  }

  seleccionarArchivo(event){
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;

    if(files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);

  }

  upload() {
    console.log(this.archivo);
    this.fileUploadService.uploadFile(this.archivo).subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
        }
      }
    );
  }


  

}
