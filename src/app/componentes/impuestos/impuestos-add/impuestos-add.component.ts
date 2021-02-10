import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { Router } from '@angular/router';
import { OrganizacionService } from '../../../servicios/organizacion.service';
import { CommonService } from '../../../servicios/common.service';
import { ImpuestosService } from '../../../servicios/impuestos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impuestos-add',
  templateUrl: './impuestos-add.component.html',
  styleUrls: ['./impuestos-add.component.css']
})
export class ImpuestosAddComponent implements OnInit {

  log: boolean = false;

  impuestos = null;

  imp = {
    TaxID: null,
    OrganizationID: this.organizationService.getID(),
    TaxName: null,
    TaxPercentage: null
  }

  constructor(public loginService: LoginService,
              public organizationService : OrganizacionService,
              public impuestosService: ImpuestosService,
              public commonService: CommonService,
              public router: Router) { }

  respuesta: string;

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      this.respuesta = this.commonService.getFlagger();
    }
    else{
      this.router.navigate(['/']);
    }
  }

  createImpuesto() {
    var token = this.loginService.getToken();
    var organizationID = this.organizationService.getID();
    if(token != null){
      if(this.imp.TaxName === '' || this.imp.TaxName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else if(this.imp.TaxPercentage === '' || this.imp.TaxPercentage === null){
        Swal.fire('El campo procentaje es obligatorio');
      }
      else{
        // 4 si vengo de productos, 0 si no, 5_impuestos si vengo de lineas de facturas
        if(this.respuesta === '4'){
          this.impuestosService.createImpuesto(this.imp)
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
        else if(this.respuesta === '5_impuestos'){
          this.impuestosService.createImpuesto(this.imp)
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
        else if(this.respuesta === '0'){
          this.impuestosService.createImpuesto(this.imp)
          .subscribe(res => { 
            if(res['resultado'] == 'OK') {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res['mensaje'],
                showConfirmButton: false,
                timer: 1500
              });
              this.impuestosService.getAllImpuestos(organizationID);
              this.router.navigate(['/impuestos']);
            }
          });
        }
       
      }
     
    }
   
  }

  cancel() {
    this.router.navigate(['/impuestos']);
  }

}
