import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { Router } from '@angular/router';
import { OrganizacionService } from '../../../servicios/organizacion.service';
import { CommonService} from '../../../servicios/common.service';
import { PagosService } from '../../../servicios/pagos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos-add',
  templateUrl: './pagos-add.component.html',
  styleUrls: ['./pagos-add.component.css']
})
export class PagosAddComponent implements OnInit {

  log: boolean = false

  terminos = null;

  term = {
    TermID: null,
    OrganizationID: this.organizacionService.getID(),
    TermName: null,
    TermDays: null
  }

  constructor(public loginService: LoginService,
              public router: Router,
              public terminosService: PagosService,
              public commonService: CommonService,
              public organizacionService: OrganizacionService) { }

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

  createTermino() {
    var token = this.loginService.getToken();
    var organizationID = this.organizacionService.getID();
    if(token != null){
      if(this.term.TermName === '' || this.term.TermName === null){
        Swal.fire('El campo nombre es obligatorio');
      }
      else if(this.term.TermDays === '' || this.term.TermDays === null){
        Swal.fire('El campo días es obligatorio');
      }
      else{
        // 2 si vengo de clientes, 0 si no
        if(this.respuesta === '2'){
            this.terminosService.createTermino(this.term)
              .subscribe(res => { 
                if(res['resultado'] == 'OK') {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res['mensaje'],
                    showConfirmButton: false,
                    timer: 2000
              });
              this.router.navigate(['/clientes/añadir']);
            }
          });
        }
        else if(this.respuesta === '0'){
          this.terminosService.createTermino(this.term)
            .subscribe(res => { 
              if(res['resultado'] == 'OK') {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: res['mensaje'],
                  showConfirmButton: false,
                  timer: 2000
            });
            this.terminosService.getAllTerminos(organizationID);
            this.router.navigate(['/terminos-pagos']);
          }
        });
        }
        
      }
     
    }
   
  }

  cancel() {
    this.router.navigate(['/terminos-pagos']);
  }

}
