import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { ExporterService } from '../../servicios/exporter.service';
import { ImpuestosService } from '../../servicios/impuestos.service';
import { CommonService } from '../../servicios/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.css']
})
export class ImpuestosComponent implements OnInit {

  dataImpuestos: any = [];

  page: number = 1;

  filterImpuestos = '';

  log: boolean = false;

  upd: boolean = false;

  impuestos = null;

  imp = {
    TaxID: null,
    OrganizationID: this.organizationService.getID(),
    TaxName: null,
    TaxPercentage: null
  }


  constructor(public loginService: LoginService,
              public organizationService : OrganizacionService,
              public impuestosService: ImpuestosService,
              public exporterService: ExporterService,
              public commonService: CommonService,
              public router: Router) { }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.getAllImpuestos();
    }
    else{
      this.router.navigate(['/']);
    }
  }

  nuevoImpuesto(){
    this.commonService.setFlagger('0');
    this.router.navigate(['/impuestos/añadir']);
  }

  getAllImpuestos() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null){
      this.impuestosService.getAllImpuestos(organizationID)
        .subscribe(res => {
          this.impuestos = res;
          this.dataImpuestos = res;
      });
    }
  }

  exportAsXLSX():void {
    let timerInterval;
    Swal.fire({
      title: 'Exportando impuestos al directorio Descargas de tu PC!',
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
    this.exporterService.exportAsExcelFile(this.dataImpuestos, 'impuestos');
  }

  getImpuesto(TaxID) {
    console.log(TaxID);
    var token = this.loginService.getToken();
    if(token != null){
      this.impuestosService.getImpuesto(TaxID)
        .subscribe(res => {
          this.imp = res[0];
          this.upd = true;
      });
    }
  }

  deleteImpuesto(TaxID) {
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar este impuesto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.impuestosService.deleteImpuesto(TaxID)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire(
                    'Borrado!',
                    res['mensaje'],
                    'success'
                  );
                  this.getAllImpuestos();
                }
              });
            }
      });
    }
    
  }

  updateImpuesto() {
    var token = this.loginService.getToken();
    if(token != null){
      if(this.imp.TaxName === '' || this.imp.TaxName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else if(this.imp.TaxPercentage === '' || this.imp.TaxPercentage === null){
        Swal.fire('El campo procentaje es obligatorio');
      }
      else{
        this.impuestosService.updateImpuesto(this.imp)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/impuestos']);
              this.getAllImpuestos();
              this.upd = false;
            }
          });
        }
    }
  }

  hayRegistros() {
    return true;
  } 

}
