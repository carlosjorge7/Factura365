import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { PagosService } from '../../servicios/pagos.service';
import { CommonService } from '../../servicios/common.service';
import { ExporterService } from '../../servicios/exporter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  dataClientes: any = [];

  page: number = 1;

  filterClientes = '';

  log: boolean = false;

  upd: boolean = false;

  clientes = null;

  monedas = [];
  paises = [];

  cli = {
    CustomerID: null,
    OrganizationID: this.organizationService.getID(),
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
    ShippingCode: null,
    Balance: null
  }

  terminos = null;
  mySelect = [];
  selectedKey : any;
  

  constructor(public clientesService: ClientesService,
              public loginService: LoginService,
              public organizationService: OrganizacionService,
              public commonService: CommonService,
              public router: Router,
              public terminosService: PagosService,
              public exporterService: ExporterService) { 
                    this.monedas = this.commonService.monedas;
                    this.paises = this.commonService.paises;
              }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.getAllClientes();
      var organizationID = this.organizationService.getID();
      this.terminosService.getTerminosNombres(organizationID)
        .subscribe(res => {
          this.terminos = res;
      });
    }
    else{
      this.router.navigate(['/']);
    }
  }

  nuevoCliente(){
    this.commonService.setFlagger('0');
    this.router.navigate(['/clientes/añadir']);
  }

  getAllClientes() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null){
      this.cli.StatusCode = '400'
      this.clientesService.getAllClientes(organizationID,  this.cli.StatusCode)
        .subscribe(res => {
          this.clientes = res;
          this.dataClientes = res;
      });
    }
  }

  exportAsXLSX():void {
    let timerInterval;
    Swal.fire({
      title: 'Exportando clientes al directorio Descargas de tu PC!',
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
    this.exporterService.exportAsExcelFile(this.dataClientes, 'clientes');
  }

  getCliente(CustomerID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.clientesService.getCliente(CustomerID)
        .subscribe(res => {
          this.cli = res[0];
          this.upd = true;
      });
    }

  }


  deleteCliente(CustomerID) {
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar este cliente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            var proceso = 'inactivo';
            var organizationID = this.organizationService.getID();
            this.clientesService.deleteCliente(proceso, organizationID, CustomerID)
            .subscribe(res => { 
              if(res['resultado'] == 'OK') {
                Swal.fire(
                  'Borrado!',
                  res['mensaje'],
                  'success'
                );
                this.getAllClientes();
              }
            });
          }
      });
      
    }
  }

  updateCliente() {
    var token = this.loginService.getToken();
    if(token != null){
      if(this.cli.CustomerName === '' || this.cli.CustomerName === null){
        Swal.fire('El campo nombre fiscal es obligatorio');
      }
      else{
        this.clientesService.updateCliente(this.cli)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/clientes']);
            this.getAllClientes();
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
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.terminos)[0].id;
    this.cli.TermDays = this.selectedKey;
  }

  newTermino(){
    this.commonService.setFlagger('1');
    this.router.navigate(['/terminos-pagos/añadir']);
  }

}
