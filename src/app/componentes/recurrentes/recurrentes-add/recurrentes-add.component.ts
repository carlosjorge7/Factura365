import { Component, OnInit } from '@angular/core';
import { RecurrentesService } from '../../../servicios/recurrentes.service';
import { LoginService } from '../../../servicios/login.service';
import { OrganizacionService } from '../../../servicios/organizacion.service';
import { Router } from '@angular/router';
import { PagosService } from '../../../servicios/pagos.service';
import { CommonService } from '../../../servicios/common.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { FacturasService } from  '../../../servicios/facturas.service';
import { ClientesService } from '../../../servicios/clientes.service';
import { FacturaslineasService } from '../../../servicios/facturaslineas.service';
import { ProductosService } from '../../../servicios/productos.service';
import { ImpuestosService } from '../../../servicios/impuestos.service';
import { ExporterService } from '../../../servicios/exporter.service';

@Component({
  selector: 'app-recurrentes-add',
  templateUrl: './recurrentes-add.component.html',
  styleUrls: ['./recurrentes-add.component.css']
})
export class RecurrentesAddComponent implements OnInit {

  log: boolean = false;

  // data recurrentes
  recurrentes = null;
  re = {
    OrganizationID: this.organizationService.getID(),
    InvoiceID: null,
    RecurringTypeCode: null,
    RecurringName: null,
    StartDate: null,
    EndDate: null,
    RepeatEvery: null,
    Frecuency: null,
    TermDays: null,
    CreateAction: null,
    CreateEmail: null,
    RecurringStatus: null,
    RecurringID: null
  }

  // data facturas
  facturas = null;
  fac = {
    Random: this.facturasService.getRandom(),
    InvoiceID: null,
    OrganizationID: this.organizationService.getID(),
    CustomerID: null, 
    InvoiceDate: moment().format("DD/MM/YYYY"),
    InvoiceNumber: null,
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
    IRPF: null
  }

  // data lineas
  updLin: boolean = false;

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
 


  constructor(public loginService: LoginService,
              public organizationService: OrganizacionService,
              public clientesService: ClientesService,
              public router: Router,
              public facturasService: FacturasService,
              public terminosService: PagosService,
              public commonService: CommonService,
              public recurrentesService: RecurrentesService,
              public facturaslineasService: FacturaslineasService,
              public exporterService: ExporterService,
              public productosService: ProductosService,
              public impuestosService: ImpuestosService) { }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;

      var organizationID = this.organizationService.getID();

      /*var f = new Date();
      this.fac.InvoiceDate = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();*/
    
      // Cargamos el combos
      this.clientesService.getClientesNombres(organizationID)
        .subscribe(res => {
          this.clientes = res;
      });
      this.productosService.getProductosNombres(organizationID)
        .subscribe(res => {
          this.productos = res;
      });
      this.impuestosService.getImpuestosPorcentajes(organizationID)
        .subscribe(res => {
          this.impuestos = res;
          this.impuestos1 = res;
      });

      /*this.organizationService.getOrganizacion(organizationID)
        .subscribe(res => {
          this.fac.InvoiceNumber = res[0]['InvoiceRoot'] + '' + (res[0]['InvoiceLastNumber']+1).toString();
          this.facturasService.setInvoiceNumber(this.fac.InvoiceNumber);
          console.log(this.fac.InvoiceNumber);
      });*/

      this.calcularFactura();
      this.getAllFacturasLineas();
    }
    else{
      this.router.navigate(['/']);
    }
  }

  // Metodos recurrentes

  nuevaRecurrente() {
    this.router.navigate(['/recurrentes-cabecera']);
  }

  getAllRecurrentes() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null){
      this.recurrentesService.getAllRecurrentes(organizationID)
        .subscribe(res => {
          this.recurrentes = res;
          //this.dataContactos = res;
        });
    }
  }

  getRecurrente(RecurringID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.recurrentesService.getRecurrente(RecurringID)
        .subscribe(res => {
          this.re = res[0];
          //this.upd = true;
      });
    }
  }

  deleteRecurrente(RecurringID) {
    var token = this.loginService.getToken();

    var InvoiceID = 0;
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar esta recurrente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.recurrentesService.deleteRecurrente(InvoiceID, RecurringID)
            .subscribe(res => { 
              if(res['resultado'] == 'OK') {
                Swal.fire(
                  'Borrado!',
                  res['mensaje'],
                  'success'
                );
                this.getAllRecurrentes();
              }
            });
          }
      });

    }
  }

  updateRecurrente() {
    var token = this.loginService.getToken();
    if(token != null){
      /*if(this.con.CustomerID === '' || this.con.CustomerID === null){
        Swal.fire('El campo cliente es obligatorio');
      }
      else if(this.con.FirstName === '' || this.con.FirstName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else{*/
        this.recurrentesService.updateRecurrente(this.re)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/recurrentes/añadir']);
            this.getAllRecurrentes();
            //this.upd = false;
          }
        });
      //}
     
    }
  }



  // metodos facturas

  flagger(){
    // 1 si vengo del componente Nueva Factura, 0 si vengo del componente Actualizar
    this.facturasService.setFlagger('1');
    this.router.navigate(['/facturas-lineas']);
  }

  calcularFactura() {
    this.calcularImporte();
    //var invoiceID = this.facturasService.getID();
    var random = this.facturasService.getRandom();
    this.facturasService.calcularFactura(random)
        .subscribe(res => {
          console.log(res[0]);
          this.fac.Discount = res[0]['Discount'];
          this.fac.SubTotal = res[0]['BaseImponible']; // Base Imponible
          this.fac.IVA = res[0]['IVA'];
          this.fac.IRPF = res[0]['IRPF'];
          this.fac.Total = res[0]['Total'];
      });
  }

  createFactura() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null) {
      // Hago la peticion al invoice number por si hay concurrencia
      this.organizationService.getOrganizacion(organizationID)
        .subscribe(res => {
          this.fac.InvoiceNumber = res[0]['InvoiceRoot'] + '' + (res[0]['InvoiceLastNumber']+1).toString();
          this.facturasService.setInvoiceNumber(this.fac.InvoiceNumber);
          console.log(this.fac.InvoiceNumber);
      });

      if(this.fac.CustomerID === '' || this.fac.CustomerID === null){
        Swal.fire('El campo cliente es obligatorio');
      }
      else{
        // 2 para recurrentes, 9 para abonos, 1 para facturas
        this.fac.InvoiceType = '1';
        this.fac.InvoiceStatus = '510';
        this.fac.InvoiceNumber = this.facturasService.getInvoiceNumber();

        this.facturasService.createFactura(this.fac)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/facturas']);
            this.facturasService.deleteID();
            this.facturasService.deleteRandom();
            this.facturasService.deleteInvoiceNumber();
          }
        });
      }
      
    }
  }


  // metodos lineas

  getAllFacturasLineas(){
    // Habra que hacer una distincion si estoy creando o actualizando (Recuerda que cuando creo genera Random y cuando actualizo es el InvoiceID)
    var token = this.loginService.getToken();
    var random = this.facturasService.getRandom();
    if(token != null){
      this.facturaslineasService.getAllFacturasLineas(random)
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
    var token = this.loginService.getToken();
    if(token != null){
      this.facturaslineasService.getFacturaLinea(Invoice_LineID)
        .subscribe(res => {
          console.log(res);
          this.lin = res[0];
          this.updLin = true;
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
          }
        });
      }
    }
  }

  hayRegistros() {
    return true;
  } 

  cancel(){
    this.router.navigate(['/facturas']);
  }

  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.clientes)[0].id;
    this.fac.CustomerID = this.selectedKey;
  }

  newCliente(){
    this.commonService.setFlagger('5_clientes');
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
    this.commonService.setFlagger('5_productos');
    this.router.navigate(['/productos/añadir']);
  }

  newImpuesto(){
    this.commonService.setFlagger('5_impuestos');
    this.router.navigate(['/impuestos/añadir']);
  }


}
