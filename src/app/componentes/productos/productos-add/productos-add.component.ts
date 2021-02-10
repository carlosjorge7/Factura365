import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../servicios/productos.service';
import { CategoriasService } from '../../../servicios/categorias.service';
import { CommonService } from '../../../servicios/common.service';
import { ProductosComponent } from '../productos.component';
import { LoginService } from '../../../servicios/login.service';
import { OrganizacionService } from '../../../servicios/organizacion.service';
import { Router } from '@angular/router';
import { ImpuestosService } from '../../../servicios/impuestos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-add',
  templateUrl: './productos-add.component.html',
  styleUrls: ['./productos-add.component.css'],
  providers: [ProductosService, ProductosComponent]
})
export class ProductosAddComponent implements OnInit {

  log: boolean = false;

  productos = null;

  pro = {
    ProductID: null,
    OrganizationID: this.organizationService.getID(),
    ProductName: null,
    ProductDescription: null,
    ProductPriceSale: null,
    ProductPriceCost: null,
    ProductTax1Rate: null,
    ProductTax2Rate: null,
    ProductTax3Rate: null,
    CategoryID: null,
    ProductType: null,
    ProductCode: null,
    Usageunit: null,
    ProductStatus: null,
    CategoryName: null
  }

  categorias = null;
  mySelect = [];
  selectedKey : any;

  //IVA
  impuestos = null;
  myPercentaje = [];
  selectedPercentaje: any;

  //IRPF
  impuestos1 = null;
  myPercentaje1 = [];
  selectedPercentaje1: any;


  constructor(public productosService: ProductosService,
              public router: Router, 
              public categoriasService: CategoriasService,
              public organizationService: OrganizacionService,
              public commonService: CommonService,
              public impuestosService: ImpuestosService,
              public loginService: LoginService) {
  }

  resultado: string;

  ngOnInit() {
    var organizationID = this.organizationService.getID();
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.resultado = this.commonService.getFlagger();
      this.categoriasService.getCategoriasNombres(organizationID)
        .subscribe(res => {
          this.categorias = res;
      });
      this.impuestosService.getImpuestosPorcentajes(organizationID)
        .subscribe(res => {
          this.impuestos = res;
          this.impuestos1 = res;
      });
    }
    else{
      this.router.navigate(['/']);
    }
  }

  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.categorias)[0].id;
    this.pro.CategoryID = this.selectedKey;
    console.log(this.pro.CategoryID);
  }

  selectPercentage() {
    this.selectedPercentaje = this.commonService.getDropDownText(this.myPercentaje, this.impuestos)[0].id;
    this.pro.ProductTax1Rate = this.selectedPercentaje;
  }

  selectPercentage1() {
    this.selectedPercentaje1 = this.commonService.getDropDownText(this.myPercentaje1, this.impuestos1)[0].id;
    this.pro.ProductTax2Rate = this.selectedPercentaje1;
  }

  createProducto() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null){
      if(this.pro.ProductName === '' || this.pro.ProductName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else{
        // 5_productos si vengo de linea de facturas, 0 si no
        if(this.resultado === '5_productos'){
          this.pro.ProductStatus = '300';
          this.productosService.createProducto(this.pro)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/facturas-lineas']);
            }
          });
        }
        else if(this.resultado === '0'){
          this.pro.ProductStatus = '300';
          this.productosService.createProducto(this.pro)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.productosService.getAllProductos(organizationID, this.pro.ProductStatus);
              this.router.navigate(['/productos']);
            }
          });
        }
      }
    }
  }

  cancel() {
    this.router.navigate(['/productos']);
  }

  newCategoria(){
    this.commonService.setFlagger('3')
    this.router.navigate(['/categorias/añadir']);
  }

  newImpuesto(){
    this.commonService.setFlagger('4')
    this.router.navigate(['/impuestos/añadir']);
  }

}
