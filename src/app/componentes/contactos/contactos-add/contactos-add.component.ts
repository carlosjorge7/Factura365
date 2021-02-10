import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../../../servicios/contactos.service';
import { ContactosComponent } from '../contactos.component';
import { CommonService } from '../../../servicios/common.service';
import { ClientesService } from '../../../servicios/clientes.service';
import { LoginService } from '../../../servicios/login.service';
import { OrganizacionService } from '../../../servicios/organizacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as jquery from 'jquery';

@Component({
  selector: 'app-contactos-add',
  templateUrl: './contactos-add.component.html',
  styleUrls: ['./contactos-add.component.css'],
  providers: [ContactosService, ContactosComponent]
})
export class ContactosAddComponent implements OnInit {


  log: boolean = false;

  contactos = null;

  con = {
    OrganizationID: this.organizacionService.getID(),
    CustomerID: null,
    CustomerName: null,
    FirstName: null,
    LastName: null,
    Email: null,
    MobilePhone: null,
    SkypeIdentity : null,
    Department: null
  }

  clientes = null;
  mySelect = [];
  selectedKey : any;

  constructor(public contactosService: ContactosService,
              public commonService: CommonService,
              public clientesService: ClientesService,
              public router: Router,
              public organizacionService: OrganizacionService,
              public loginService: LoginService) { }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      var organizationID = this.organizacionService.getID();

      //jquery('.js-example-basic-single').select2(); //initialize select2 to particular input


      this.clientesService.getClientesNombres(organizationID)
        .subscribe(res => {
          this.clientes = res;
      });
    }
    else{
      this.router.navigate(['/']);
    }
  }

  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.clientes)[0].id;
    this.con.CustomerID = this.selectedKey;
    console.log(this.con.CustomerID);
  }

  createContacto() {
    var token = this.loginService.getToken();
    var organizationID = this.organizacionService.getID();
    if(token != null){
      if(this.con.CustomerID === '' || this.con.CustomerID === null){
        Swal.fire('El campo cliente es obligatorio');
      }
      else if(this.con.FirstName === '' || this.con.FirstName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else{
        this.contactosService.createContacto(this.con)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.contactosService.getAllContactos(organizationID);
            this.router.navigate(['/contactos']);
          }
        });
      }
      

    }
   
  }

  cancel() {
    this.router.navigate(['/contactos']);
  }

  
  newCliente(){
    this.commonService.setFlagger('1');
    this.router.navigate(['/clientes/añadir']);
  } 

}
