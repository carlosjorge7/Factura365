import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../servicios/categorias.service';
import { LoginService } from '../../servicios/login.service';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { Router } from '@angular/router';
import { CommonService } from '../../servicios/common.service';
import { ExporterService } from '../../servicios/exporter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [CategoriasService]
})
export class CategoriasComponent implements OnInit {

  dataCategorias: any = [];

  page: number = 1;

  filterCategorias = '';

  log: boolean = false;

  upd: boolean = false;
 
  categorias = null;

  categ = {
    CategoryID: null,
    OrganizationID: this.organizationService.getID(),
    CategoryName: null,
    CategoryID_Parent: null,
    CategoryName_Parent: null
  }

  // categoria padre
  mySelect = [];
  selectedKey : any;
  categorias_padre = null;


  constructor(public categoriasService: CategoriasService,
              public organizationService: OrganizacionService,
              public loginService: LoginService,
              public commonService: CommonService,
              public router: Router,
              public exporterService: ExporterService) { }

  ngOnInit() {
    var organizationID = this.organizationService.getID();
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.getAllCategorias();
      this.categoriasService.getCategoriasNombres(organizationID)
        .subscribe(res => {
          this.categorias_padre = res;
      });
     
    }
    else{
      this.router.navigate(['/']);
    }
  }

  nuevaCategoria(){
    this.commonService.setFlagger('0');
    this.router.navigate(['/categorias/añadir']);
  }

  exportAsXLSX():void {
    let timerInterval;
    Swal.fire({
      title: 'Exportando categorías al directorio Descargas de tu PC!',
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
    this.exporterService.exportAsExcelFile(this.dataCategorias, 'categorías');
  }


  getAllCategorias() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null){
      this.categoriasService.getAllCategorias(organizationID)
        .subscribe(res => {
          this.categorias = res;
          this.dataCategorias = res;
      });
    }
   
  }

  getCategoria(CategoryID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.categoriasService.getCategoria(CategoryID)
        .subscribe(res => {
          this.categ = res[0];
          this.upd = true;
      });
    }
  }

  deleteCategoria(CategoryID) {
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
          
            this.categoriasService.deleteCategoria(CategoryID)
            .subscribe(res => { 
              if(res['resultado'] == 'OK') {
                Swal.fire(
                  'Borrado!',
                  res['mensaje'],
                  'success'
                );
                this.getAllCategorias();
              }
            });
          }
      });

      
    }
    
  }

  updateCategoria() {
    var token = this.loginService.getToken();
    if(token != null){
      if(this.categ.CategoryName === '' || this.categ.CategoryName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else{
        this.categoriasService.updateCategoria(this.categ)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            //this.router.navigate(['/categorias']);  No hace falta volver a esta ruta, ya estoy en ella
            this.getAllCategorias();
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
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.categorias_padre)[0].id;
    this.categ.CategoryID_Parent = this.selectedKey;
  }

  

}
