import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from '../../../servicios/organizacion.service';
import { LoginService } from '../../../servicios/login.service';
import { PagosRecibidosService } from '../../../servicios/pagos-recibidos.service';
import { CommonService } from '../../../servicios/common.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientesService } from '../../../servicios/clientes.service';
import { FacturasService } from '../../../servicios/facturas.service';

@Component({
  selector: 'app-pagosrecibidos-add',
  templateUrl: './pagosrecibidos-add.component.html',
  styleUrls: ['./pagosrecibidos-add.component.css']
})
export class PagosrecibidosAddComponent implements OnInit {

  log: boolean = false;

  pagosrecibidos = null;

  pa = {
    PaymentID: null,
    OrganizationID: this.organizationService.getID(),
    InvoiceID: null,
    InvoiceNumber: null,
    InvoiceType: null,
    CustomerID: null,
    CustomerName: null,
    PaymentDate: null,
    PaymentMethodID: null,
    PaymentMethod: null,
    PaymentDescription: null,
    PaymentAmount: null,
    PaymentReference: null
  }

  constructor(public organizationService: OrganizacionService,
              public commonService: CommonService,
              public loginService: LoginService,
              public clientesService: ClientesService,
              public router: Router,
              public facturasService: FacturasService,
              public pagosrecibidosService: PagosRecibidosService) { }

  // combos: cliente, numero de factura y métodos de pago
  clientes = null;
  mySelectClientes = [];
  selectedKeyCliente : any;

  facturas = null;
  mySelectFacturas = [];
  selectedKeyFactura : any;

  metodospago = null;
  mySelectedMetodosPago = [];
  selectedKeyMetodoPago : any;


  ngOnInit() {
    var organizationID = this.organizationService.getID();
    if(this.loginService.isLogginIn()){
      this.log = true;

      // Cargamos el combos: clientes, facturas y metodos de pago
      this.clientesService.getClientesNombres(organizationID)
          .subscribe(res => {
            this.clientes = res;
      });
      
      this.pagosrecibidosService.getMetodosPagoNombres()
        .subscribe(res => {
          this.metodospago = res;
      });
    }
    else{
      this.router.navigate(['/']);
    }
  }

  cancel(){
    this.router.navigate(['/pagos']);
  }
  
  createPagoRecibido() {
    var token = this.loginService.getToken();
    //var organizationID = this.organizationService.getID();
    if(token != null){
      if(this.pa.CustomerID === '' || this.pa.CustomerID === null){
        Swal.fire('El campo cliente es obligatorio');
      }
      else if(this.pa.InvoiceID === '' || this.pa.InvoiceID === null){
        Swal.fire('El campo número de factura es obligatorio');
      }
      else if(this.pa.PaymentDate === '' || this.pa.PaymentDate === null){
        Swal.fire('El campo fecha de pago es obligatorio');
      }
      else if(this.pa.PaymentAmount === '' || this.pa.PaymentAmount === null){
        Swal.fire('El campo total es obligatorio');
      }
      else{
        this.pagosrecibidosService.createPagoRecibido(this.pa)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
                  timer: 2000
            });
            this.router.navigate(['/pagos']);
          }
        });
      } 
    }
  }

  // clientes
  selectChangeCliente() {
    this.selectedKeyCliente = this.commonService.getDropDownText(this.mySelectClientes, this.clientes)[0].id;
    this.pa.CustomerID = this.selectedKeyCliente;

    var organizationID = this.organizationService.getID();
    this.pagosrecibidosService.getAllFacturasByCliente(organizationID, this.pa.CustomerID)
      .subscribe(res => {
        console.log(res);
        this.facturas = res;
    });
  }

  // facturas
  selectChangeFactura(){
    this.selectedKeyFactura = this.commonService.getDropDownText(this.mySelectFacturas, this.facturas)[0].id;
    this.pa.InvoiceID = this.selectedKeyFactura;
  }

  // metodos
  selectChangeMetodoPago(){
    this.selectedKeyMetodoPago = this.commonService.getDropDownText(this.mySelectedMetodosPago, this.metodospago)[0].id;
    this.pa.PaymentID = this.selectedKeyMetodoPago;
  }

}
