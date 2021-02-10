import { Component } from '@angular/core';
import { LoginService } from './servicios/login.service';
import { UserService } from './servicios/user.service';
import { OrganizacionService } from './servicios/organizacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent {
  
  title = 'Factura365';

  log: boolean = false;

  landing: boolean = false;

  //organization = null;

  org = {
    OrganizationID: this.organizationService.getID(),
    OrganizationName: null
  }

  us = {
    user: this.userService.getNombre()
  }

  constructor(public loginService: LoginService, 
              public organizationService: OrganizacionService,
              public userService: UserService,
              public router: Router){
    //this.loginService.deleteToken();
  }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      console.log('ESTAS LOGGEADO');
      console.log(this.loginService.getToken());
      console.log(this.organizationService.getID());
      //console.log(this.org.OrganizationName);
      console.log(this.userService.getNombre());
      this.log = true;
      this.router.navigate(['/inicio']);

      var organizationID = this.organizationService.getID();
      this.getNombre(organizationID);
    }
  }

  getNombre(organizationID) {
    var OrganizationID = this.organizationService.getID();
    if(OrganizationID != null){
      this.organizationService.getNombre(organizationID)
        .subscribe(res => {
          this.org = res[0];
      });
    }
    
  }

  login(){
    this.router.navigate(['/login']);
    this.landing = true;
  }

  register() {
    this.router.navigate(['/login/añadir']);
    this.landing = true;
  }

  logout(){

    Swal.fire({
      title: '¿Estas segur@ de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loginService.deleteToken();
          this.organizationService.deleteID();
          this.userService.deleteNombre();
          this.router.navigate(['/login']);
          this.reloadPage();
        }
    });

  
  }

  reloadPage() {
    window.location.reload();
  }

 

}

  

