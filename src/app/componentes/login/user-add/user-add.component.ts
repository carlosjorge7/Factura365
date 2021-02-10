import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { AppComponent } from './../../../app.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  providers: [LoginService]
})
export class UserAddComponent implements OnInit {

  usuario = null;
  usr = {
    OrganizationName: null,
    UsuarioName: null,
    UsuarioLastName: null,
    Email: null,
    Password: null,
    ReferOrganizationID: null
  }

  constructor(public loginService: LoginService,
              public appComponent: AppComponent,
              public router: Router) { }

  ngOnInit() {
    this.appComponent.landing = true;
  }

  register() {
    if(this.usr.OrganizationName === '' || this.usr.OrganizationName === null){
      Swal.fire('El campo organización es obligatorio');
    }
    else if(this.usr.UsuarioName === '' || this.usr.UsuarioName === null){
      Swal.fire('El campo nombre es obligatorio');
    }
    else if(this.usr.UsuarioLastName === '' || this.usr.UsuarioLastName === null){
      Swal.fire('El campo apellidos es obligatorio');
    }
    else if(this.usr.Email === '' || this.usr.Email === null){
      Swal.fire('El campo email es obligatorio');
    }
    else if(this.usr.Password === '' || this.usr.Password === null){
      Swal.fire('El campo contraseña es obligatorio');
    }
    else if(this.usr.Password.length < 8){
      Swal.fire('El campo contraseña debe tener mínimo 8 caracteres alfanuméricos');
    }
    else{
    this.loginService.register(this.usr)
      .subscribe(res => {
        if(res['response'] == 'OK') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res['mensaje'],
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/login']);
          this.sendWelcome();
        }
        if(res['response_err'] == 'KO'){
          Swal.fire({
            icon: 'error',
            title: res['mensaje_err']
          });
        }
      });
    }
  }

  private sendWelcome(): void {
    this.loginService.sendWelcome(this.usr.Email, this.usr.UsuarioName)
      .subscribe(res => {
        console.log(res);
      });
  }

}
