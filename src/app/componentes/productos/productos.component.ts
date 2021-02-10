import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { CommonService } from '../../servicios/common.service'; // Para los desplegables
import { CategoriasService } from '../../servicios/categorias.service';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { ImpuestosService } from '../../servicios/impuestos.service';
import { ExporterService } from '../../servicios/exporter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  dataProductos: any = [];

  page: number = 1;

  filterProductos = '';

  log: boolean = false;

  upd: boolean = false;

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
    CategoryName: null,
    ProductType: null,
    ProductCode: null,
    Usageunit: null,
    ProductStatus: null
  }

  // categorias combo
  mySelect = [];
  selectedKey : any;
  categorias = null;

  //IVA combo
  impuestos = null;
  myPercentaje = [];
  selectedPercentaje: any;

  //IRPF combo
  impuestos1 = null;
  myPercentaje1 = [];
  selectedPercentaje1: any;

  constructor(public productosService: ProductosService,
              public commonService: CommonService,
              public categoriasService: CategoriasService,
              public loginService: LoginService,
              public organizationService: OrganizacionService,
              public impuestosService: ImpuestosService,
              public router: Router,
              public exporterService: ExporterService) { }

  ngOnInit() {
    var organizationID = this.organizationService.getID();
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.getAllProductos();
      //
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

  nuevoProducto(){
    this.commonService.setFlagger('0');
    this.router.navigate(['/productos/añadir']);
  }

  getAllProductos() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null){
      this.pro.ProductStatus = '300';
      this.productosService.getAllProductos(organizationID, this.pro.ProductStatus)
        .subscribe(res => {
          this.productos = res;
          this.dataProductos = res;
        });
    }
  }

  exportAsXLSX():void {
    let timerInterval;
    Swal.fire({
      title: 'Exportando productos al directorio Descargas de tu PC!',
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
    this.exporterService.exportAsExcelFile(this.dataProductos, 'productos');
  }

  getProducto(ProductID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.productosService.getProducto(ProductID)
        .subscribe(res => {
          console.log(ProductID);
          this.pro = res[0];
          this.upd = true;
        });
    }
  }

  deleteProducto(ProductID) {
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            var proceso = 'inactivo';
            var organizationID = this.organizationService.getID();
            this.productosService.deleteProducto(proceso, organizationID, ProductID)
            .subscribe(res => { 
              if(res['resultado'] == 'OK') {
                Swal.fire(
                  'Borrado!',
                  res['mensaje'],
                  'success'
                );
                this.getAllProductos();
              }
            });
          }
      });
    }
  }

  updateProducto() {
    var token = this.loginService.getToken();
    if(token != null){
      if(this.pro.ProductName === '' || this.pro.ProductName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else{
        this.productosService.updateProducto(this.pro)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/productos']);
            this.getAllProductos();
            this.upd = false;
          }
        });
      }

    }
    
  }

  cancel() {
    history.back();
  }


  hayRegistros() {
    return true;
  } 

  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.categorias)[0].id;
    this.pro.CategoryID = this.selectedKey;
  }

  selectPercentage() {
    this.selectedPercentaje = this.commonService.getDropDownText(this.myPercentaje, this.impuestos)[0].id;
    this.pro.ProductTax1Rate = this.selectedPercentaje;
  }

  selectPercentage1() {
    this.selectedPercentaje1 = this.commonService.getDropDownText(this.myPercentaje1, this.impuestos1)[0].id;
    this.pro.ProductTax2Rate = this.selectedPercentaje1;
  }

  // Para actualizar
  newCategoria(){
    this.commonService.setFlagger('3');
    this.router.navigate(['/categorias/añadir']);
  }

  newImpuesto(){
    this.commonService.setFlagger('4');
    this.router.navigate(['/impuestos/añadir']);
  }





}
