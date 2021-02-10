import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { ExporterService } from '../../servicios/exporter.service';
import { CommonService } from '../../servicios/common.service';

import { FileuploadService } from '../../servicios/fileupload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css'],
  providers: [OrganizacionService]
})
export class OrganizacionComponent implements OnInit {

   // carga de imagen para la organizacion
   archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null
  }

  dataOrganizaciones: any = [];

  page: number = 1;

  filterOrganizaciones = '';

  log: boolean = false;

  upd: boolean = false;

  organizaciones = null;

  monedas = [];
  paises = [];

  org = {
    UsuarioID: this.loginService.getToken(),
    OrganizationID: null,
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
    InvoiceRoot: null,
    InvoiceLastNumber: null,
    EstimateRoot: null,
    EstimateLastNumber: null,
    CreditRoot: null,
    CreditLastNumber: null,
    OrganizationIBAN: null,
    OrganizationBank: null,
    OrganizationStatusCode: null,
    TermsConditionsInvoice: null,
    LogoUrl: null
  }

  organizationID: string;


  constructor(public organizacionService: OrganizacionService,
              public loginService: LoginService,
              public commonService: CommonService,
              public exporterService: ExporterService,
              public router: Router,
              public fileUploadService : FileuploadService) {
                this.monedas = this.commonService.monedas;
                this.paises = this.commonService.paises;
               }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.getAllOrganizaciones();
    }
    else{
      this.router.navigate(['/']);
    }

  }

  getAllOrganizaciones() {
    var token = this.loginService.getToken();
    if(token != null){
      this.organizacionService.getAllOrganizaciones(token)
        .subscribe(res => {
          this.organizaciones = res;
          this.dataOrganizaciones = res;
        });
    }
    
  }

  exportAsXLSX():void {
    let timerInterval;
    Swal.fire({
      title: 'Exportando organizaciones al directorio Descargas de tu PC!',
      html: 'Copiando datos a excel',
      timer: 2000,
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
             
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    });
    this.exporterService.exportAsExcelFile(this.dataOrganizaciones, 'organizaciones');
  }

  getOrganizacion(OrganizationID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.organizacionService.getOrganizacion(OrganizationID)
        .subscribe(res => {
          this.org = res[0];
          this.upd = true;
        });
    }
    
  }

  deleteOrganizacion(OrganizationID) {
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar esta organización?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            var proceso = 'change_status';
            this.org.OrganizationStatusCode = '299';
    
            this.organizacionService.deleteOrganizacion(proceso, token, OrganizationID,  this.org.OrganizationStatusCode  )
            .subscribe(res => { 
              if(res['resultado'] == 'OK') {
                Swal.fire(
                  'Borrado!',
                  res['mensaje'],
                  'success'
                );
                this.getAllOrganizaciones();
              }
            });
          }
      });
    }
  }

  updateOrganizacion() {
    var token = this.loginService.getToken();
    if(token != null){
      if(this.org.OrganizationName === '' || this.org.OrganizationIdFiscal === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else{
        this.organizacionService.updateOrganizacion(this.org)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/organizaciones']);
              this.getAllOrganizaciones();
              this.upd = false;
            }
          });
      }
    }
    
  }


  predetermidada(){
    this.router.navigate(['/organizacion-predeterminada']);
  }

  hayRegistros() {
    return true;
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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: datos['mensaje'],
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  }

  

}
