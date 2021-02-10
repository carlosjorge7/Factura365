import { Component, OnInit } from '@angular/core';
import { FacturaslineasService } from '../../servicios/facturaslineas.service';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { LoginService } from '../../servicios/login.service';
import { FacturasService } from '../../servicios/facturas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductosService } from '../../servicios/productos.service';
import { CommonService } from '../../servicios/common.service';
import { ImpuestosService } from '../../servicios/impuestos.service';


@Component({
  selector: 'app-facturas-lineas',
  templateUrl: './facturas-lineas.component.html',
  styleUrls: ['./facturas-lineas.component.css']
})
export class FacturasLineasComponent implements OnInit {

  log: boolean = false;

  //upd: boolean = false;

  lineas = null;

  lin = {
    Invoice_LineID: null,
    //InvoiceID: this.facturasService.getID(), 
    //InvoiceID: this.facturasService.getRandom(),
    //InvoiceNumber: this.facturasService.getInvoiceNumber(),
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

  // productos combo
  mySelect = [];
  selectedKey : any;
  productos = null;

  //IVA combo
  impuestos = null;
  myPercentaje = [];
  selectedPercentaje: any;

  //IRPF combo
  impuestos1 = null;
  myPercentaje1 = [];
  selectedPercentaje1: any;

  constructor(public facturasService: FacturasService,
              public loginService: LoginService,
              public organizationService: OrganizacionService,
              public router: Router,
              public facturaslineasService: FacturaslineasService,
              public commonService: CommonService,
              public impuestosService: ImpuestosService,
              public productosService: ProductosService) { }

  respuesta: string;

  ngOnInit() {
    var invoiceID = this.facturasService.getID();
    var organizationID = this.organizationService.getID();
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.respuesta = this.facturasService.getFlagger();
      this.productosService.getProductosNombres(organizationID)
        .subscribe(res => {
          this.productos = res;
      });
      this.impuestosService.getImpuestosPorcentajes(organizationID)
        .subscribe(res => {
          this.impuestos = res;
          this.impuestos1 = res;
      });

      // 1 si vengo del componente Nueva Factura, 0 si vengo del componente Actualizar
      if(this.respuesta === '1'){
        console.log('Vengo de añadir factura, para añadir una linea ');
        this.lin.InvoiceID = this.facturasService.getRandom();
        this.lin.InvoiceNumber = this.facturasService.getInvoiceNumber();
      }
      else if(this.respuesta === '7'){
        console.log('Vengo de añadir abono, para añadir una linea ');
        this.lin.InvoiceID = this.facturasService.getRandom();
        this.lin.InvoiceNumber = this.facturasService.getInvoiceNumber();
      }
      else if(this.respuesta === '0'){
        console.log('Vengo actualizar factura, para añadir una linea');
        this.lin.InvoiceID = this.facturasService.getID();
        this.lin.InvoiceNumber = this.facturasService.getInvoiceNumber();
      }
      else{
        console.log('Vengo de actualizar factura, para actualizar una linea');
        this.lin.InvoiceID = this.facturasService.getID();
        this.lin.InvoiceNumber = this.facturasService.getInvoiceNumber();
      }
    }
    else{
      this.router.navigate(['/']);
    }
  }

  // el importe por linea es sin impuestos, SOLO se aplica el dcto
  calcularImporte(){
    this.lin.ProductTotal = (this.lin.Quantity * this.lin.ProductPrice) * (1 - this.lin.Discount / 100);
    return this.lin.ProductTotal;
  }
  
  
  createFacturaLinea(){
    var token = this.loginService.getToken();
    var invoiceID = this.facturasService.getID();
    if(token != null) {
      if(this.lin.ProductID === '' || this.lin.ProductID === null){
        Swal.fire('El campo producto es obligatorio');
      }
      else{
          // 1 para facturas
          if(this.respuesta === '1'){
            // modo add
            this.calcularImporte();
            this.facturaslineasService.createFacturaLinea(this.lin)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res['mensaje'],
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.facturaslineasService.getAllFacturasLineas(this.lin.InvoiceID);
                  this.router.navigate(['/facturas/añadir']);
                }
              });
            }
            // 7 para abonos
            else if(this.respuesta === '7'){
              // modo add
              this.calcularImporte();
              this.facturaslineasService.createFacturaLinea(this.lin)
                .subscribe(res => { 
                  if(res['resultado'] == 'OK') {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: res['mensaje'],
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.facturaslineasService.getAllFacturasLineas(this.lin.InvoiceID);
                    this.router.navigate(['/abonos/añadir']);
                  }
                });
              }
              // 0 si vengo de actualizar facturas
            else if(this.respuesta === '0'){
            // modo upd
            this.calcularImporte();
            this.facturaslineasService.createFacturaLinea(this.lin)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res['mensaje'],
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.facturaslineasService.getAllFacturasLineas(this.lin.InvoiceID);
                  this.commonService.setBoolean('upd');
                  this.router.navigate(['/facturas']);
                }
              });
            }
            // 8 si vengo de actualizar abonos
            else if(this.respuesta === '8'){
              // modo upd
              this.calcularImporte();
              this.facturaslineasService.createFacturaLinea(this.lin)
                .subscribe(res => { 
                  if(res['resultado'] == 'OK') {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: res['mensaje'],
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.facturaslineasService.getAllFacturasLineas(this.lin.InvoiceID);
                    this.commonService.setBoolean('upd');
                    this.router.navigate(['/abonos']);
                  }
                });
              }
            else{
            // modo upd
            this.calcularImporte();
            this.facturaslineasService.createFacturaLinea(this.lin)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res['mensaje'],
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.facturaslineasService.getAllFacturasLineas(this.lin.InvoiceID);
                  this.router.navigate(['/facturas']);
                  // ha de volver a facturas con facturas upd = true y updlin = false
                }
              });
          } 
      }
    }
  }

  
  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.productos)[0].id;
    this.lin.ProductID = this.selectedKey;
  }

  selectPercentage() {
    this.selectedPercentaje = this.commonService.getDropDownText(this.myPercentaje, this.impuestos)[0].id;
    this.lin.ProductTax1Rate = this.selectedPercentaje;
  }

  selectPercentage1() {
    this.selectedPercentaje1 = this.commonService.getDropDownText(this.myPercentaje1, this.impuestos1)[0].id;
    this.lin.ProductTax2Rate = this.selectedPercentaje1;
  }

  calcel(){
    if(this.respuesta === '0'){
      this.router.navigate(['/facturas/añadir']);
    }
    else if(this.respuesta === '8'){
      this.router.navigate(['/abonos/añadir']);
    }
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
