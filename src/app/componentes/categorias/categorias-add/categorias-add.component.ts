import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../servicios/categorias.service';
import { CategoriasComponent } from '../categorias.component';
import { OrganizacionService } from '../../../servicios/organizacion.service';
import { LoginService } from '../../../servicios/login.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../servicios/common.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias-add',
  templateUrl: './categorias-add.component.html',
  styleUrls: ['./categorias-add.component.css'],
  providers: [CategoriasService, CategoriasComponent]
})
export class CategoriasAddComponent implements OnInit {

  categorias = null;

  categ = {
    CategoryID: null,
    OrganizationID: this.organizationService.getID(),
    CategoryName: null,
    CategoryID_Parent: null,
    CategoryName_Parent: null
  }

  log: boolean = false;

  // categoria padre
  mySelect = [];
  selectedKey : any;
  categorias_padre = null;

  constructor(public categoriasService: CategoriasService,
              public router: Router,
              public organizationService: OrganizacionService,
              public loginService: LoginService,
              public commonService: CommonService) { }

  respuesta: string;

  ngOnInit() {
    var organizationID = this.organizationService.getID();
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.respuesta = this.commonService.getFlagger(); 
      // cargamos categorias padre
      this.categoriasService.getCategoriasNombres(organizationID)
        .subscribe(res => {
          console.log(res);
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
 
  createCategoria() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null) {
      if(this.categ.CategoryName === '' || this.categ.CategoryName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else{
        // 3 si vengo de productos, 0 si no
        if(this.respuesta === '3'){
          this.categoriasService.createCategoria(this.categ)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/productos/añadir']);
            }
          });
        }
        else if(this.respuesta === '0'){
          this.categoriasService.createCategoria(this.categ)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.categoriasService.getAllCategorias(organizationID);
              this.router.navigate(['/categorias']);
            }
          });
        }
       
      }
    }
  }

  cancel() {
    this.router.navigate(['/categorias']);
  }

  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.categorias_padre)[0].id;
    this.categ.CategoryID_Parent = this.selectedKey;
  }

}
