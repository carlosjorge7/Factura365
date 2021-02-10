import { Component, OnInit } from '@angular/core';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { CommonService } from '../../servicios/common.service'; // Para los desplegables
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organizacion-predeterminada',
  templateUrl: './organizacion-predeterminada.component.html',
  styleUrls: ['./organizacion-predeterminada.component.css']
})
export class OrganizacionPredeterminadaComponent implements OnInit {

  log: boolean = false;

  org = {
    OrganizationID: this.organizationService.getID(),
    OrganizationName: null
  }

  mySelect = [];
  selectedKey : any;
  organizaciones = null;

  constructor(public organizationService: OrganizacionService,
              public loginService: LoginService,
              public commonService: CommonService,
              public router: Router) { }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
      var organizationID = this.organizationService.getID();
      this.getNombre(organizationID);
      var token = this.loginService.getToken();
      this.organizationService.getOrganizationNombres(token)
        .subscribe(res => {
          this.organizaciones = res;
      });
    }
    else{
      this.router.navigate(['/']);
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

  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.organizaciones)[0].id;
    this.org.OrganizationID = this.selectedKey;
    this.organizationService.setID(this.org.OrganizationID);
    this.alert();
    this.time();
    this.reloadPage();
  }

  alert() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Has cambiado de Organización',
      showConfirmButton: false,
      timer: 2000
    });
  }

  reloadPage() {
    window.location.reload();
  }

  time(){
    setTimeout(function(){ console.log('Set time out'); }, 90000);
  }

}
