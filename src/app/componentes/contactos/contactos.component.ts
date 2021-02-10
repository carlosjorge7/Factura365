import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../../servicios/contactos.service';
import { CommonService } from '../../servicios/common.service';
import { ClientesService } from '../../servicios/clientes.service';
import { LoginService } from '../../servicios/login.service';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { Router } from '@angular/router';
import { ExporterService } from '../../servicios/exporter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
  providers: [ContactosService]
})
export class ContactosComponent implements OnInit {

  dataContactos: any = [];

  page: number = 1;

  filterContactos = '';

  log: boolean = false;

  upd: boolean = false;

  contactos = null;

  // La tabla de Contactos en SQL no tiene el campo OrganizationID
  con = {
    ContacID: null,
    OrganizationID: this.organizacionService.getID(),
    CustomerID: null,
    FirstName: null,
    LastName: null,
    Email: null,
    MobilePhone: null,
    SkypeIdentity : null,
    Department: null,
    CustomerName: null
  }

  mySelect = [];
  selectedKey : any;
  clientes = null;

  constructor(public contactosService: ContactosService,
              public commonService: CommonService,
              public clientesService: ClientesService,
              public loginService: LoginService,
              public organizacionService: OrganizacionService,
              public router: Router,
              public exporterService: ExporterService) { }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.getAllContactos();
      var organizationID = this.organizacionService.getID();
      this.clientesService.getClientesNombres(organizationID)
        .subscribe(res => {
          this.clientes = res;
      });
    }
    else{
      this.router.navigate(['/']);
    }
  }

  nuevoContacto(){
    this.commonService.setFlagger('0');
    this.router.navigate(['/contactos/añadir']);
  }

  exportAsXLSX():void {
    let timerInterval;
    Swal.fire({
      title: 'Exportando contactos al directorio Descargas de tu PC!',
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
    this.exporterService.exportAsExcelFile(this.dataContactos, 'contactos');
  }

  getAllContactos() {
    var token = this.loginService.getToken();
    var organizationID = this.organizacionService.getID();
    if(token != null){
      this.contactosService.getAllContactos(organizationID)
        .subscribe(res => {
          this.contactos = res;
          this.dataContactos = res;
        });
    }
  }

  getContacto(ContacID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.contactosService.getContacto(ContacID)
        .subscribe(res => {
          this.con = res[0];
          this.upd = true;
      });
    }
  }

  deleteContacto(ContacID) {
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar este contacto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.contactosService.deleteContacto(ContacID)
            .subscribe(res => { 
              if(res['resultado'] == 'OK') {
                Swal.fire(
                  'Borrado!',
                  res['mensaje'],
                  'success'
                );
                this.getAllContactos();
              }
            });
          }
      });

    }
  }

  updateContacto() {
    var token = this.loginService.getToken();
    if(token != null){
      if(this.con.CustomerID === '' || this.con.CustomerID === null){
        Swal.fire('El campo cliente es obligatorio');
      }
      else if(this.con.FirstName === '' || this.con.FirstName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else{
        this.contactosService.updateContacto(this.con)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/contactos']);
            this.getAllContactos();
            this.upd = false;
          }
        });
      }
     
    }
  }

  hayRegistros() {
    return true;
  } 

  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.clientes)[0].id;
    this.con.CustomerID = this.selectedKey;
  }

  newCliente(){
    this.commonService.setFlagger('1');
    this.router.navigate(['/clientes/añadir']);
  } 

}
