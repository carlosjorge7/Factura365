import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { UserService } from '../../servicios/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  usuario = null;
  usr = {
    Email: null,
    Password: null,
    token: null
  }

  us = {
    UsuarioName: null,
    UsuarioLastName: null,
    Email: null
  }

  token: number;
  organizationID: string;
  user: string;

  constructor(public loginService: LoginService,
              public appComponent: AppComponent,
              public organizacionService: OrganizacionService,
              public userService: UserService,
               public router: Router) { }

  ngOnInit() {
    this.appComponent.landing = true;
  }

  /** Cuando hacemos login establecemos el token(UsrID), organizationID y el nombre completo del usuario */
  login() {
    if(this.usr.Email === '' || this.usr.Email === null){
      Swal.fire('El campo email es obligatorio');
    }
    else if(this.usr.Password === '' || this.usr.Password === null){
      Swal.fire('El campo contraseña es obligatorio');
    }
    else{
      this.loginService.login(this.usr)
      .subscribe(res => { 
        if(res['resultado'] == 'OK') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res['mensaje'],
            showConfirmButton: false,
            timer: 2000
          });
          this.token = res['token'];
          this.loginService.setToken(this.token.toString());
          this.organizacion();
          this.userNombre();
          this.reloadPage();
          this.router.navigate(['/inicio']);
        }
        else if(res['resultado1'] == 'KO'){
          Swal.fire({
            icon: 'error',
            title: res['mensaje1'],
            text: 'Comprueba que las credenciales sean correctas'
          });
          this.token = null;
          this.router.navigate(['/login']);
        }
      });
    }
  
  }

  organizacion(){
    this.organizacionService.getOrganizationID(this.token, 1)
      .subscribe(res =>{
        this.organizationID = res.toString();
        this.organizacionService.setID(this.organizationID);
      });
  }

  userNombre(){
    this.userService.getUser(this.token)
      .subscribe(res => {
        this.us = res[0];
        this.user = this.us.UsuarioName + ' ' + this.us.UsuarioLastName;
        this.userService.setNombre(this.user);
      });
  }

  reloadPage() {
    window.location.reload();
  }

}
