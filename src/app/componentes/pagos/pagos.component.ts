import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { ExporterService } from '../../servicios/exporter.service';
import { PagosService } from '../../servicios/pagos.service';
import { CommonService } from '../../servicios/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  // Acuardate que Pagos se refiere a terminos de Pago
  
  log: boolean = false;

  dataTerminos: any = [];

  page: number = 1;

  filterTerminos = '';

  upd: boolean = false;

  terminos = null;

  term = {
    TermID: null,
    OrganizationID: this.organizacionService.getID(),
    TermName: null,
    TermDays: null
  }

  constructor(public loginService: LoginService,
              public router: Router,
              public terminosService: PagosService,
              public organizacionService: OrganizacionService,
              public commonService: CommonService,
              public exporterService: ExporterService
              ) { }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.getAllTerminos();
    }
    else{
      this.router.navigate(['/']);
    }
  }

  nuevoTermino(){
    this.commonService.setFlagger('0');
    this.router.navigate(['/terminos-pagos/añadir']);
  }

  getAllTerminos() {
    var token = this.loginService.getToken();
    var organizationID = this.organizacionService.getID();
    if(token != null){
      this.terminosService.getAllTerminos(organizationID)
        .subscribe(res => {
          this.terminos = res;
          this.dataTerminos = res;
      });
    }
  }

  getTermino(TermID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.terminosService.getTermino(TermID)
        .subscribe(res => {
          this.term = res[0];
          this.upd = true;
      });
    }
  }

  exportAsXLSX():void {
    let timerInterval;
    Swal.fire({
      title: 'Exportando términos de pago al directorio Descargas de tu PC!',
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
    this.exporterService.exportAsExcelFile(this.dataTerminos, 'terminos_pago');
  }

  deleteTermino(TermID) {
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar este término de pago?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.terminosService.deleteTermino(TermID)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire(
                    'Borrado!',
                    res['mensaje'],
                    'success'
                  );
                  this.getAllTerminos();
                }
              });
            }
      });
    }
  }

  updateTermino() {
    var token = this.loginService.getToken();
    if(token != null){
      if(this.term.TermName === '' || this.term.TermName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else if(this.term.TermDays === '' || this.term.TermDays === null){
        Swal.fire('El campo días es obligatorio');
      }
      else{
        this.terminosService.updateTermino(this.term)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllTerminos();
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
