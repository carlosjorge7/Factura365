import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../servicios/facturas.service';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { ExporterService } from '../../servicios/exporter.service';
import { CommonService } from '../../servicios/common.service'; // Para los desplegables
import { ClientesService } from '../../servicios/clientes.service';
import  Swal  from 'sweetalert2';
import { FacturaslineasService } from '../../servicios/facturaslineas.service';
import { ProductosService } from '../../servicios/productos.service';
import { ImpuestosService } from '../../servicios/impuestos.service';
import { UserService } from '../../servicios/user.service';
//import {jsPDF} from 'jspdf';
//import * as moment from 'moment';

@Component({
  selector: 'app-abonos',
  templateUrl: './abonos.component.html',
  styleUrls: ['./abonos.component.css']
})
export class AbonosComponent implements OnInit {

  dataAbonos: any = [];

  filterFacturas = '';

  page: number = 1;

  log: boolean = false;

  upd: boolean = false;

  lineas = null;

  lin = {
    Invoice_LineID: null,
    InvoiceID: null, 
    InvoiceNumber: null,
    ProductID: null,
    ProductName: null,
    ProductDescription: null,
    Quantity: null,
    ProductPrice: null,
    Discount: null,
    ProductTax1Rate: null,
    ProductTax2Rate: null,
    ProductTotal: null
  }

  facturas = null;

  fac = {
    Respuesta: null,
    InvoiceID: this.facturasService.getID(),
    Random: this.facturasService.getRandom(),
    OrganizationID: this.organizationService.getID(),
    CustomerID: null,
    Email: 'email',
    InvoiceDate:  null,
    InvoiceNumber: this.facturasService.getInvoiceNumber(),
    InvoiceType: null,
    InvoiceStatus: null,
    DueDate: null,
    PurchaseOrder: null,
    Notes: null,
    TermsConditions: 
    'Ley Orgánica de Protección de Datos sus datos están incluidos en un archivo de titularidad de TECNOFUN DIGITAL, S.L., con el objetivo de mantener nuestras relaciones comerciales.',
    SubTotal: null, 
    Total: null,
    Salesperson: this.loginService.getToken(),
    RecurringID:null,
    Discount: null,
    IVA: null,
    IRPF: null,
    CustomerName: null,
    Balance: null
  }

  // combos
  clientes = null;
  mySelect = [];
  selectedKey : any;

  productos = null;
  mySelect1 = [];
  selectedKey1 : any;

  impuestos = null;
  myPercentaje = [];
  selectedPercentaje: any;

  impuestos1 = null;
  myPercentaje1 = [];
  selectedPercentaje1: any;


  constructor(public facturasService: FacturasService,
              public clientesService: ClientesService,
              public loginService: LoginService,
              public organizationService: OrganizacionService,
              public commonService: CommonService,
              public router: Router,
              public exporterService: ExporterService,
              public facturaslineasService: FacturaslineasService,
              public productosService: ProductosService,
              public userService: UserService,
              public impuestosService: ImpuestosService) {}

  

            
  sendInvoice(InvoiceID, OrganizationName, CustomerName, InvoiceNumber) {
    var organizationID = this.organizationService.getID();
    console.log(InvoiceID);
    console.log(OrganizationName);
    console.log(CustomerName);

    var token = this.loginService.getToken();

    this.userService.getUser(token)
      .subscribe(res => {
        this.facturasService.setEmail(res[0]['Email'].toString());
    });

    console.log(this.facturasService.getEmail());
    console.log(InvoiceNumber);
    
    //this.facturasService.setFilename('aa_FACTURA_'+organizationID+InvoiceID+'.pdf');
    console.log('Paso 1', InvoiceID);
    this.facturasService.setFilename('http://localhost/tecinvoice/rest_api_invoice/invoice-pdf/FACTURA_'+organizationID+InvoiceID+'.pdf');
    //this.facturasService.setFilename(null);
    console.log(this.facturasService.getFilename());

    // Genero la factura y la subo a Azure

    console.log('Paso 2', InvoiceID);
    // subo el fichero a azure y guardo la url en la base de datos
    this.facturasService.uploadInvoice_To_Azure(InvoiceID)
      .subscribe(res => {
        res;
    });

    console.log('Paso 3', InvoiceID);
    //Bajo la url de la bd
    this.facturasService.getInvoiceURL(InvoiceID)
      .subscribe(res => {
        //this.facturasService.setUrl(res[0]['InvoiceURL'].toString());
        this.facturasService.setUrl(null);
        //window.open(res[0]['InvoiceURL']);
    });
    console.log(this.facturasService.getUrl());

    /*this.facturasService.uploadInvoice_And_GetURL_From_Azure(InvoiceID)
      .subscribe(res => {

        this.facturasService.setUrl(res[0]['url'].toString());
    });
    console.log(this.facturasService.getUrl());*/
    
    // Envio el email
    this.facturasService.sendInvoice(OrganizationName, CustomerName, this.facturasService.getEmail(), InvoiceNumber, this.facturasService.getFilename(), this.facturasService.getUrl())
      .subscribe(res => {
        console.log(res);
    });

    this.facturasService.deleteFilename();
    this.facturasService.deleteUrl();
    this.facturasService.deleteEmail();

    let timerInterval;
    Swal.fire({
      title: 'Enviando Email de la factura',
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
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    });
  }

  
  imprimirPDF(InvoiceID: string | number){
    let timerInterval;
    Swal.fire({
      title: 'Exportando PDF de la factura',
      html: 'Copiando datos al directorio /Descargas de tu PC!',
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
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    });
    // subo el fichero a azure y guardo la yrl en la base de datos
    this.facturasService.uploadInvoice_To_Azure(InvoiceID)
      .subscribe(res => {
        res;
    });

    //Bajo la url de la bd
    this.facturasService.getInvoiceURL(InvoiceID)
      .subscribe(res => {
        window.open(res[0]['InvoiceURL'].toString());
    });
  }

  hacerPago(){
    this.router.navigate(['/pagos/añadir']);
  }

  clonar(){

  }
 
  flagger(){
    // 1 si vengo del componente Nueva Factura, 0 si vengo del componente Actualizar
    this.facturasService.setFlagger('8');
    this.router.navigate(['/facturas-lineas']);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  generateRandom(){
    this.commonService.setFlagger('0_facturas');
    this.router.navigate(['/abonos/añadir']);
    var Random = this.getRandomInt(1, 88899954);
    this.facturasService.setRandom(Random.toString());
  }

  respuestaUpd: string;

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      var bool = this.commonService.getBoolean();
      if(bool == 'upd'){
        //this.upd = true;
      }
      // si vengo de añadir linea, cuando estoy actualizando, upd ha de ser true
      /*this.respuestaUpd = this.facturasService.getFlaggerUpd();
      if(this.respuestaUpd === '1'){
        this.upd = true;
      }*/
      this.getAllFacturas();
      var organizationID = this.organizationService.getID();
      this.facturasService.deleteID();
    
      this.clientesService.getClientesNombres(organizationID)
        .subscribe(res => {
          this.clientes = res;
      }); 
    }
    else{
      this.router.navigate(['/']);
    }
  }

  getAllFacturas() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    var customerID = '%';
    var invoiceType = '9'; // abono
    var invoiceDateFrom = '%';
    var invoiceDateTo = '%';
    var invoiceStatus = '%';

    if(token != null){
      this.facturasService.getAllFacturas(organizationID, customerID, invoiceType, invoiceDateFrom, invoiceDateTo, invoiceStatus)
        .subscribe(res => {
          this.facturas = res;
          this.dataAbonos = res;  
      });
    }
  }

  exportAsXLSX():void {
    let timerInterval;
    Swal.fire({
      title: 'Exportando facturas al directorio Descargas de tu PC!',
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
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    });
    this.exporterService.exportAsExcelFile(this.dataAbonos, 'facturas');
  }

  getFactura(InvoiceID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.facturasService.getFactura(InvoiceID)
        .subscribe(res => {
          var invoiceID = res[0]['InvoiceID'].toString();
          var invoiceNumber = res[0]['InvoiceNumber'].toString();
          this.facturasService.setID(invoiceID);
          this.facturasService.setInvoiceNumber(invoiceNumber);
          this.fac = res[0];
          this.upd = true;
      });

      this.facturaslineasService.getAllFacturasLineas(InvoiceID)
        .subscribe(res => {
          this.lineas = res;
      });
    }
  }

  deleteFactura(InvoiceID) {
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar esta factura?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.facturasService.deleteFactura(InvoiceID)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire(
                    'Borrado!',
                    res['mensaje'],
                    'success'
                  );
                  this.getAllFacturas();
                }
              });
            }
      });
    }  
  }

  updateFactura() {
    var token = this.loginService.getToken();
    if(token != null){
      if(this.fac.CustomerID === '' || this.fac.CustomerID === null){
        Swal.fire('El campo cliente es obligatorio');
      }
      // Resivar
      else if(this.fac.InvoiceDate === '' || this.fac.InvoiceDate === null){
        Swal.fire('El campo fecha es obligatorio');
      }
      else if(this.fac.DueDate === '' || this.fac.DueDate === null){
        Swal.fire('El campo fecha de vencimiento es obligatorio');
      }
      else{
        this.facturasService.updateFactura(this.fac)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllFacturas();
            this.upd = false;
          }
        });
      }
     
    }
  }

  /*LINEAS DE FACTURA */

  updLin: boolean = false;

  getAllFacturasLineas(){
    var token = this.loginService.getToken();
    var invoiceID = this.facturasService.getID();
    if(token != null){
      this.facturaslineasService.getAllFacturasLineas(invoiceID)
        .subscribe(res => {
          this.lineas = res;
      });
    }
  }

  deleteFacturaLinea(Invoice_LineID){
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar esta línea de factura?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.facturaslineasService.deleteFacturaLinea(Invoice_LineID)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire(
                    'Borrada!',
                    res['mensaje'],
                    'success'
                  );
                  this.calcularFactura();
                  this.getAllFacturasLineas();
                }
              });
            }
      });
    }
  }

  getFacturaLinea(Invoice_LineID) {
    var organizationID = this.organizationService.getID();
    // cargamos los combos justo antes de ir al formulario de actualizar
    this.productosService.getProductosNombres(organizationID)
    .subscribe(res => {
      this.productos = res;
    });
    this.impuestosService.getImpuestosPorcentajes(organizationID)
      .subscribe(res => {
        this.impuestos = res;
        this.impuestos1 = res;
    });

    var token = this.loginService.getToken();
    if(token != null){
      this.facturaslineasService.getFacturaLinea(Invoice_LineID)
        .subscribe(res => {
          this.lin = res[0];
          this.updLin = true;
          this.upd = false;
      });
    }
  }

  calcularImporte(){
    this.lin.ProductTotal = (this.lin.Quantity * this.lin.ProductPrice) * (1 - this.lin.Discount / 100);
    return this.lin.ProductTotal;
  }

  updateFacturaLinea(){
    this.calcularImporte();
    var token = this.loginService.getToken();
    if(token != null){
      if(this.lin.ProductID === '' || this.lin.ProductID === null){
        Swal.fire('El campo producto es obligatorio');
      }
      else{
        this.facturaslineasService.updateFacturaLinea(this.lin)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.calcularFactura();
            this.getAllFacturasLineas();
            this.updLin = false;
            this.upd = true;
          }
      });
      }
    }
  }

  calcularFactura() {
    this.calcularImporte();
    var invoiceID = this.facturasService.getID();
    this.facturasService.calcularFactura(invoiceID)
      .subscribe(res => {
        this.fac.Discount = res[0]['Discount'];
        this.fac.SubTotal = res[0]['BaseImponible']; 
        this.fac.IVA = res[0]['IVA'];
        this.fac.IRPF = res[0]['IRPF'];
        this.fac.Total = res[0]['Total'];
    });
  }

  hayRegistros() {
    return true;
  } 

  // funciones combos
  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.clientes)[0].id;
    this.fac.CustomerID = this.selectedKey;
  }

  newCliente(){
    this.router.navigate(['/clientes/añadir']);
  }

  selectChange1() {
    this.selectedKey1 = this.commonService.getDropDownText(this.mySelect1, this.productos)[0].id;
    this.lin.ProductID = this.selectedKey1;
  }

  selectPercentage() {
    this.selectedPercentaje = this.commonService.getDropDownText(this.myPercentaje, this.impuestos)[0].id;
    this.lin.ProductTax1Rate = this.selectedPercentaje;
  }

  selectPercentage1() {
    this.selectedPercentaje1 = this.commonService.getDropDownText(this.myPercentaje1, this.impuestos1)[0].id;
    this.lin.ProductTax2Rate = this.selectedPercentaje1;
  }

  newProducto() {
    this.router.navigate(['/productos/añadir']);
  }

  newImpuesto(){
    this.router.navigate(['/impuestos/añadir']);
  }

}
