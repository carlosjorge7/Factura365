import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../servicios/clientes.service';
import { LoginService } from '../../../servicios/login.service';
import { OrganizacionService } from '../../../servicios/organizacion.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../servicios/common.service';
import { PagosService } from '../../../servicios/pagos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-add',
  templateUrl: './clientes-add.component.html',
  styleUrls: ['./clientes-add.component.css'],
  providers: [ClientesService]
})
export class ClientesAddComponent implements OnInit {

  monedas = [];
  paises = [];

  clientes = null;

  cli = {
    CustomerID: null,
    OrganizationID: this.organizacionService.getID(),
    StatusCode: null,
    IdFiscal: null,
    CustomerName: null,
    DisplayName: null,
    Email: null,
    Phone: null,
    CreditLimit: null,
    TermDays: null,
    CurrencyCode: null,
    CustomerNotes: null,
    Website: null,
    BillingAddress: null,
    BillingStreet2: null,
    BillingCity: null,
    BillingState: null,
    BillingCountryIso: null,
    BillingCode: null,
    ShippingAddress: null,
		ShippingStreet2: null,
		ShippingCity: null,
		ShippingState: null,
		ShippingCountryIso: null,
	  ShippingCode: null
  }

  log: boolean = false;

  // combos
  terminos = null;
  mySelect = [];
  selectedKey : any;

  constructor(public clientesService: ClientesService,
               public router: Router,
               public organizacionService: OrganizacionService,
               public commonService: CommonService,
               public terminosService: PagosService,
               public loginService: LoginService) {
                this.monedas = this.commonService.monedas;
                this.paises = this.commonService.paises;
                }

  respuesta: string;

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.respuesta = this.commonService.getFlagger();
      var organizationID = this.organizacionService.getID();
      this.terminosService.getTerminosNombres(organizationID)
        .subscribe(res => {
          this.terminos = res;
      });
      //console.log(this.respuesta); si vengo de contactos o no
    }
    else{
      this.router.navigate(['/']);
    }
  }

  createCliente() {
    var token = this.loginService.getToken();
    var organizationID = this.organizacionService.getID();
    this.cli.StatusCode = '400';
    if(token != null) {
      if(this.cli.CustomerName === '' || this.cli.CustomerName === null){
        Swal.fire('El campo nombre fiscal es obligatorio');
      }
      else{
        // 1 vengo de contactos, 0 vengo de clientes, 2 si vengo de terminos de pago
        if(this.respuesta === '1'){
          this.clientesService.createCliente(this.cli)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/contactos/añadir']);
            }
          });
        }
        // 5_clientes si vengo de facturas
        else if(this.respuesta === '5_clientes'){
          this.clientesService.createCliente(this.cli)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/facturas/añadir']);
            }
          });
        }
        else if(this.respuesta === '0' || this.respuesta == '2'){
          this.clientesService.createCliente(this.cli)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.clientesService.getAllClientes(organizationID,  this.cli.StatusCode);
              this.router.navigate(['/clientes']);
            }
          });
        }
      }
    }
  }

  cancel(){
    this.router.navigate(['/clientes']);
  }

  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.terminos)[0].id;
    this.cli.TermDays = this.selectedKey;
  }

  newTermino(){
    this.commonService.setFlagger('2');
    this.router.navigate(['/terminos-pagos/añadir']);
  }
}
