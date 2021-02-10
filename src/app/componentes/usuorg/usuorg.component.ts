import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { UsuorgService } from '../../servicios/usuorg.service';
import { OrganizacionService } from '../../servicios/organizacion.service';
import Swal from 'sweetalert2';
import { ExporterService } from '../../servicios/exporter.service';
import { CommonService } from '../../servicios/common.service';

@Component({
  selector: 'app-usuorg',
  templateUrl: './usuorg.component.html',
  styleUrls: ['./usuorg.component.css']
})
export class UsuorgComponent implements OnInit {

  dataUsuorg: any = [];

  roles = [];

  filterUsuorg = '';

  page: number = 1;

  upd: boolean = false;

  usuorg = null;

  uo = {
    Usuario_OrganizationID: null,
    UsuarioID: this.loginService.getToken(),
    OrganizationID: this.organizationService.getID(),
    OrganizationDefault: null,
    Usuario_OrganizationRoleCode: null,
    Email: null,
    RoleName: null
  }

  log: boolean = false;

  constructor(public loginService: LoginService,
              public usuorgService: UsuorgService,
              public organizationService: OrganizacionService,
              public exporterService: ExporterService,
              public commonService: CommonService,
              public router: Router) {
                this.roles = this.commonService.roles;
               }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.getAllUsuorg();
    }
    else{
      this.router.navigate(['/']);
    }
  }

  getAllUsuorg() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null){
      this.usuorgService.getAllUsuorg(token, organizationID)
        .subscribe(res => {
          console.log(res);
          this.usuorg = res;
          this.dataUsuorg = res;
      });
    }
  }

  updateUsuorg(){
    if(this.uo.Email === '' || this.uo.Email === null){
      Swal.fire('El campo email es obligatorio');
    }
    else if(this.uo.Usuario_OrganizationRoleCode === '' || this.uo.Usuario_OrganizationRoleCode === null){
      Swal.fire('El campo permiso es obligatorio');
    }
    else{
      this.usuorgService.updateUsuorg(this.uo)
      .subscribe(res => { 
        if(res['resultado'] == 'OK') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res['mensaje'],
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/usuarios-permisos']);
          this.getAllUsuorg();
          this.upd = false;
        }
      });
    
    }
  
  }

  deleteUsuorg(Usuario_OrganizationID: string | number){
    var token = this.loginService.getToken();
    var proceso = 'delete';
    var organizationID = this.organizationService.getID();
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
            this.usuorgService.deleteUsuorg(proceso, organizationID, Usuario_OrganizationID)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire(
                    'Borrado!',
                    res['mensaje'],
                    'success'
                  );
                  this.getAllUsuorg();
                }
              });
            }
      });
    }
  }

  getUsuorg(Usuario_OrganizationID: string | number){
    var token = this.loginService.getToken();
    if(token != null){
      this.usuorgService.getUsuorg(Usuario_OrganizationID)
        .subscribe(res => {
          console.log(res[0]);
          this.uo = res[0];
          this.upd = true;
      });
    }
  }

 

  hayRegistros(){
    return true;
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
    this.exporterService.exportAsExcelFile(this.dataUsuorg, 'usuarios_permisos');
  }
}
