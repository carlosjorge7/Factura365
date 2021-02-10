import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { ExporterService } from '../../servicios/exporter.service';
import { CommonService } from '../../servicios/common.service'; // Para los desplegables
import { ClientesService } from '../../servicios/clientes.service';
import  Swal  from 'sweetalert2';
import { PresupuestoslineasService } from '../../servicios/presupuestoslineas.service'
import { ProductosService } from '../../servicios/productos.service';
import { ImpuestosService } from '../../servicios/impuestos.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  filterPre = '';

  dataPresupuestos: any = [];

  filterPresupuestos = '';

  page: number = 1;
  
  log: boolean = false;

  upd: boolean = false;

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
    Respuesta: null,
    EstimateID: this.presupuestosService.getID(),
    Random: this.presupuestosService.getRandom(),
    OrganizationID: this.organizationService.getID(),
    CustomerID: null,
    EstimateDate:  null,
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
    IRPF: null,
    CustomerName: null
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
              public exporterService: ExporterService,
              public presupuestoslineasService: PresupuestoslineasService,
              public productosService: ProductosService,
              public impuestosService: ImpuestosService) { }

  /*
   imprimirPDF(InvoiceID: string | number){
    var url_local = `http://localhost/tecinvoice/rest_api_invoice/a_report_invoice.php?InvoiceID=${InvoiceID}`;
    var url_azure = ``;
    window.open(url_local);
  } */

  
  flagger(){
    // 1 si vengo del componente Nueva Factura, 0 si vengo del componente Actualizar
    this.presupuestosService.setFlagger('0');
    this.router.navigate(['/presupuestos-lineas']);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  generateRandom(){
    this.commonService.setFlagger('0_presupuestos');
    this.router.navigate(['/presupuestos/añadir']);
    var Random = this.getRandomInt(1, 88899954);
    this.presupuestosService.setRandom(Random.toString());
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
      this.getAllPresupuestos();
      var organizationID = this.organizationService.getID();
      this.presupuestosService.deleteID();
    
      this.clientesService.getClientesNombres(organizationID)
        .subscribe(res => {
          this.clientes = res;
      }); 
    }
    else{
      this.router.navigate(['/']);
    }
  }

  getAllPresupuestos() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    var customerID = '%';
    //var invoiceType = '1';
    var estimateDateFrom = '%';
    var estimateDateTo = '%';
    var estimateStatus = '%';

    if(token != null){
      this.presupuestosService.getAllPresupuestos(organizationID, customerID, estimateDateFrom, estimateDateTo, estimateStatus)
        .subscribe(res => {
          console.log(res);
          this.presupuestos = res;
          this.dataPresupuestos = res;  
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
    this.exporterService.exportAsExcelFile(this.dataPresupuestos, 'presupuestos');
  }

  getPresupuesto(EstimateID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.presupuestosService.getPresupuesto(EstimateID)
        .subscribe(res => {
          var estimateID = res[0]['EstimateID'].toString();
          var estimateNumber = res[0]['EstimateNumber'].toString();
          this.presupuestosService.setID(estimateID);
          this.presupuestosService.setEstimateNumber(estimateNumber);
          this.pre = res[0];
          this.upd = true;
      });

      this.presupuestoslineasService.getAllPresupuestosLineas(EstimateID)
        .subscribe(res => {
          this.lineas = res;
      });
    }
  }

  deletePresupuesto(EstimateID) {
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar este presupuesto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.presupuestosService.deletePresupuesto(EstimateID)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire(
                    'Borrado!',
                    res['mensaje'],
                    'success'
                  );
                  this.getAllPresupuestos();
                }
              });
            }
      });
    }  
  }

  updatePresupuesto() {
    var token = this.loginService.getToken();
    if(token != null){
      if(this.pre.CustomerID === '' || this.pre.CustomerID === null){
        Swal.fire('El campo cliente es obligatorio');
      }
      else if(this.pre.EstimateDate === '' || this.pre.EstimateDate === null){
        Swal.fire('El campo fecha es obligatorio');
      }
      else if(this.pre.DueDate === '' || this.pre.DueDate === null){
        Swal.fire('El campo fecha de vencimiento es obligatorio');
      }
      else{
        this.presupuestosService.updatePresupuesto(this.pre)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.getAllPresupuestos();
            this.upd = false;
          }
        });
      }
     
    }
  }

  /*LINEAS DE FACTURA */

  updLin: boolean = false;

  getAllPresupuestosLineas(){
    var token = this.loginService.getToken();
    var estimateID = this.presupuestosService.getID();
    if(token != null){
      this.presupuestoslineasService.getAllPresupuestosLineas(estimateID)
        .subscribe(res => {
          this.lineas = res;
      });
    }
  }

  deletePresupuestoLinea(Estimate_LineID){
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
            this.presupuestoslineasService.deletePresupuestoLinea(Estimate_LineID)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire(
                    'Borrada!',
                    res['mensaje'],
                    'success'
                  );
                  this.calcularPresupuesto();
                  this.getAllPresupuestosLineas();
                }
              });
            }
      });
    }
  }

  getPresupuestoLinea(Estimate_LineID) {
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
      this.presupuestoslineasService.getPresupuestoLinea(Estimate_LineID)
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
            this.upd = true;
          }
      });
      }
    }
  }

  calcularPresupuesto() {
    this.calcularImporte();
    var estimateID = this.presupuestosService.getID();
    this.presupuestosService.calcularPresupuesto(estimateID)
      .subscribe(res => {
        this.pre.Discount = res[0]['Discount'];
        this.pre.SubTotal = res[0]['BaseImponible']; 
        this.pre.IVA = res[0]['IVA'];
        this.pre.IRPF = res[0]['IRPF'];
        this.pre.Total = res[0]['Total'];
    });
  }

  hayRegistros() {
    return true;
  } 

   // funciones combos
   selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.clientes)[0].id;
    this.pre.CustomerID = this.selectedKey;
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
