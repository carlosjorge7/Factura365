import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicios/user.service';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  page: number = 1;

  log: boolean = false;

  
  usuarios = null;

  us = {
    UsuarioID: null,
    UsuarioName: null,
    UsuarioLastName: null,
    Email: null,
    proceso: null
  }

  constructor(public userService: UserService,
              public loginService: LoginService,
              public router: Router) { }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      var token = this.loginService.getToken();
      this.getUser(token);
    }
    else{
      this.router.navigate(['/']);
    }
    
  }

 
  getUser(UsuarioID) {
    var token = this.loginService.getToken();
    if(token != null){
      this.userService.getUser(UsuarioID)
        .subscribe(res => {
          this.us = res[0];
      });
    }
  }

  updateUser() {
    var token = this.loginService.getToken();
    if(token != null){
      this.us.proceso = 'update';
      this.userService.updateUser(this.us)
        .subscribe(res => { 
          if(res['resultado'] == 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res['mensaje'],
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/inicio']);
          }
        });
    }
  }

  eliminarCuenta(){
    var token = this.loginService.getToken();
    if(token != null){
      Swal.fire({
        title: '¿Estas segur@ de eliminar esta cuenta?',
        text: "No podras revertir los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.us.proceso = 'inactivo';
            this.userService.eliminarCuenta(this.us)
            .subscribe(res => { 
              if(res['resultado'] == 'OK') {
                Swal.fire(
                  'Borrado!',
                  res['mensaje'],
                  'success'
                );
                this.loginService.deleteToken();
                this.reloadPage();
                this.router.navigate(['/login']);
              }
            });
          }
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }


  

}
