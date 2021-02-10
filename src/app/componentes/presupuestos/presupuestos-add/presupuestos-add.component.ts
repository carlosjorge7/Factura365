import { Component, OnInit, ɵConsole } from '@angular/core';
import { PresupuestosService } from '../../../servicios/presupuestos.service';
import { OrganizacionService } from '../../../servicios/organizacion.service';
import { LoginService } from '../../../servicios/login.service';
import { Router } from '@angular/router';
import { ExporterService } from '../../../servicios/exporter.service';
import { CommonService } from '../../../servicios/common.service'; // Para los desplegables
import { ClientesService } from '../../../servicios/clientes.service';
import { PresupuestoslineasService } from '../../../servicios/presupuestoslineas.service';
import { ProductosService } from '../../../servicios/productos.service';
import { ImpuestosService } from '../../../servicios/impuestos.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-presupuestos-add',
  templateUrl: './presupuestos-add.component.html',
  styleUrls: ['./presupuestos-add.component.css']
})
export class PresupuestosAddComponent implements OnInit {

  log: boolean = false;

  updLin: boolean = false;

  lineas = null;

  lin = {
    Estimate_LineID: null,
    EstimateID: null, 
    EstimateNumber: null,
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

  presupuestos = null;

  pre = {
    Random: this.presupuestosService.getRandom(),
    EstimateID: null,
    OrganizationID: this.organizationService.getID(),
    CustomerID: null, 
    EstimateDate: moment().format("DD/MM/YYYY"),
    EstimateNumber: this.presupuestosService.getEstimateNumber(),
    EstimateStatus: null,
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

  constructor(public presupuestosService: PresupuestosService,
              public clientesService: ClientesService,
              public loginService: LoginService,
              public organizationService: OrganizacionService,
              public commonService: CommonService,
              public router: Router,
              public presupuestoslineasService: PresupuestoslineasService,
              public exporterService: ExporterService,
              public productosService: ProductosService,
              public impuestosService: ImpuestosService) { }

  flagger(){
    // 1 si vengo del componente Nueva Factura, 0 si vengo del componente Actualizar
    this.presupuestosService.setFlagger('1');
    this.router.navigate(['/presupuestos-lineas']);
  }

  ngOnInit() {
    //console.log(moment().format("DD/MM/YYYY"));
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

      this.organizationService.getOrganizacion(organizationID)
        .subscribe(res => {
          this.pre.EstimateNumber = res[0]['EstimateRoot'] + '' + (res[0]['EstimateLastNumber']+1).toString();
          this.presupuestosService.setEstimateNumber(this.pre.EstimateNumber);
          console.log(this.pre.EstimateNumber);
      });

      this.calcularPresupuesto();
      this.getAllPresupuestosLineas();
    }
    else{
      this.router.navigate(['/']);
    }
  }

  
  /** INFO DE FACTURAS */

  calcularPresupuesto() {
    this.calcularImporte();
    //var invoiceID = this.facturasService.getID();
    var random = this.presupuestosService.getRandom();
    this.presupuestosService.calcularPresupuesto(random)
        .subscribe(res => {
          console.log(res[0]);
          this.pre.Discount = res[0]['Discount'];
          this.pre.SubTotal = res[0]['BaseImponible']; // Base Imponible
          this.pre.IVA = res[0]['IVA'];
          this.pre.IRPF = res[0]['IRPF'];
          this.pre.Total = res[0]['Total'];
      });
  }

  createPresupuesto() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null) {
      // Hago la peticion al invoice number por si hay concurrencia
      this.organizationService.getOrganizacion(organizationID)
        .subscribe(res => {
          this.pre.EstimateNumber = res[0]['EstimateRoot'] + '' + (res[0]['EstimateLastNumber']+1).toString();
          this.presupuestosService.setEstimateNumber(this.pre.EstimateNumber);
          console.log(this.pre.EstimateNumber);
      });

      if(this.pre.CustomerID === '' || this.pre.CustomerID === null){
        Swal.fire('El campo cliente es obligatorio');
      }
      else{
        //this.pre.InvoiceType = '1';
        this.pre.EstimateStatus = '510';
        this.pre.EstimateNumber = this.presupuestosService.getEstimateNumber();

        this.presupuestosService.createPresupuesto(this.pre)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/presupuestos']);
            this.presupuestosService.deleteID();
            this.presupuestosService.deleteRandom();
            this.presupuestosService.deleteEstimateNumber();
          }
        });
      }
      
    }
  }

  /** INFO DE LINEAS DE FACTURA */

  getAllPresupuestosLineas(){
    // Habra que hacer una distincion si estoy creando o actualizando (Recuerda que cuando creo genera Random y cuando actualizo es el InvoiceID)
    var token = this.loginService.getToken();
    var random = this.presupuestosService.getRandom();
    if(token != null){
      this.presupuestoslineasService.getAllPresupuestosLineas(random)
        .subscribe(res => {
          this.lineas = res;
      });
    }
  }

  deletePresupuestoLinea(Estimate_LineID){
    this.calcularImporte();
    var token = this.loginService.getToken();
    if(token != null){
      var c = confirm('Estas segur@ de eliminar esta linea de factura?');
      if(c == true){
        this.presupuestoslineasService.deletePresupuestoLinea(Estimate_LineID)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              alert(res['mensaje'])
              this.calcularPresupuesto();
              this.getAllPresupuestosLineas();
            }
        });
      }
    }
  }

  getPresupuestoLinea(Estimate_LineID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.presupuestoslineasService.getPresupuestoLinea(Estimate_LineID)
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

  updatePresupuestoLinea(){
    this.calcularImporte();
    var token = this.loginService.getToken();
    if(token != null){
      if(this.lin.ProductID === '' || this.lin.ProductID === null){
        Swal.fire('El campo producto es obligatorio');
      }
      else{
        this.presupuestoslineasService.updatePresupuestoLinea(this.lin)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.calcularPresupuesto();
            this.getAllPresupuestosLineas();
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
    this.router.navigate(['/presupuestos']);
  }

  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.clientes)[0].id;
    this.pre.CustomerID = this.selectedKey;
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
