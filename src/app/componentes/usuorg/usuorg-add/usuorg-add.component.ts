import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { UsuorgService } from '../../../servicios/usuorg.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../servicios/common.service';
import { OrganizacionService } from '../../../servicios/organizacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuorg-add',
  templateUrl: './usuorg-add.component.html',
  styleUrls: ['./usuorg-add.component.css']
})
export class UsuorgAddComponent implements OnInit {

  log: boolean = false;

  roles = [];

  usuorg = null;

  uo = {
    Email: null,
    OrganizationID: this.organizationService.getID(),
    Usuario_OrganizationRoleCode: null,
    RoleName: null
  }

  constructor(public loginService: LoginService,
              public usuorgService: UsuorgService,
              public commonservice: CommonService,
              public organizationService: OrganizacionService,
              public router: Router) { 
                this.roles = this.commonservice.roles;
              }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
    }
    else{
      this.router.navigate(['/']);
    }
  }

  createUsuorg(){
    if(this.uo.Email === '' || this.uo.Email === null){
      Swal.fire('El campo email es obligatorio');
    }
    else if(this.uo.Usuario_OrganizationRoleCode === '' || this.uo.Usuario_OrganizationRoleCode === null){
      Swal.fire('El campo permiso es obligatorio');
    }
    else{
      var token = this.loginService.getToken();
      if(token != null){
        this.usuorgService.createUsuorg(this.uo)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/usuarios-permisos']);
          }
        });
      }
    }
 

  }

  cancel(){
    this.router.navigate(['/usuarios-permisos']);
  }

}
