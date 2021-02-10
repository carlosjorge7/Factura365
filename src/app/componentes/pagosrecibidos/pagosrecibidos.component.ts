import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { PagosRecibidosService } from '../../servicios/pagos-recibidos.service';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { ExporterService } from '../../servicios/exporter.service';
import Swal from 'sweetalert2';
import { CommonService } from '../../servicios/common.service';
import { ClientesService } from '../../servicios/clientes.service';
import { FacturasService } from '../../servicios/facturas.service';

@Component({
  selector: 'app-pagosrecibidos',
  templateUrl: './pagosrecibidos.component.html',
  styleUrls: ['./pagosrecibidos.component.css']
})
export class PagosrecibidosComponent implements OnInit {

  log: boolean = false;

  dataPagosRecibidos: any = [];

  page: number = 1;

  filterPagosRecibidos = '';

  upd: boolean = false;

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

  constructor(public loginService: LoginService,
              public pagosrecibidosService: PagosRecibidosService,
              public organizationService: OrganizacionService,
              public commonService: CommonService,
              public exporterService: ExporterService,
              public clientesService: ClientesService,
              public facturasService: FacturasService,
              public router: Router) { }

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
      this.getAllPagosRecibidos();

      // Cargamos el combos: clientes, facturas y metodos de pago
      this.clientesService.getClientesNombres(organizationID)
        .subscribe(res => {
          this.clientes = res;
      });

      // Necesito el ID del cliente. HATA LOS COJONES!!!!!!!!!!

      /*this.pagosrecibidosService.getAllFacturasByCliente(organizationID, this.pa.CustomerID)
        .subscribe(res => {
          console.log(res);
          this.facturas = res;
      });*/

      this.facturasService.getFacturasNombres(organizationID)
        .subscribe(res => {
          this.facturas = res;
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

  exportAsXLSX():void {
    let timerInterval;
    Swal.fire({
      title: 'Exportando pagos recibidos al directorio Descargas de tu PC!',
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
    this.exporterService.exportAsExcelFile(this.dataPagosRecibidos, 'terminos_pago');
  }

  nuevoPagoRecibido() {
    this.router.navigate(['/pagos/añadir']);
  }

  getAllPagosRecibidos(){
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    var CustomerID = '%';
    if(token != null){
      this.pagosrecibidosService.getAllPagosRecibidos(organizationID, CustomerID)
        .subscribe(res => {
          this.pagosrecibidos = res;
          this.dataPagosRecibidos = res;
      });
    }
  }

  getPagoRecibido(PaymentID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.pagosrecibidosService.getPagoRecibido(PaymentID)
        .subscribe(res => {
          this.pa = res[0];
          this.upd = true;
      });
    }
  }

  deletePagoRecibido(PaymentID) {
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar este pago recibido?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.pagosrecibidosService.deletePagoRecibido(PaymentID)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire(
                    'Borrado!',
                    res['mensaje'],
                    'success'
                  );
                  this.getAllPagosRecibidos();
                }
              });
            }
      });
    }
  }

  updatePagoRecibido() {
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
        this.pagosrecibidosService.updatePagoRecibido(this.pa)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllPagosRecibidos();
            this.upd = false;
          }
        });
      } 
    }
  }

  // clientes
  selectChangeCliente() {
    this.selectedKeyCliente = this.commonService.getDropDownText(this.mySelectClientes, this.clientes)[0].id;
    this.pa.CustomerID = this.selectedKeyCliente;
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


  hayRegistros() {
    return true;
  } 


}
