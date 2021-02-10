import { Component, OnInit } from '@angular/core';
import { RecurrentesService } from '../../servicios/recurrentes.service';
import { LoginService } from '../../servicios/login.service';
import { OrganizacionService } from '../../servicios/organizacion.service';
import { Router } from '@angular/router';
import { PagosService } from '../../servicios/pagos.service';
import { CommonService } from '../../servicios/common.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-recurring-cabecera',
  templateUrl: './recurring-cabecera.component.html',
  styleUrls: ['./recurring-cabecera.component.css']
})
export class RecurringCabeceraComponent implements OnInit {

  log: boolean = false;

  recurrentes = null;
  re = {
    OrganizationID: this.organizationService.getID(),
    InvoiceID: null,
    RecurringTypeCode: null,
    RecurringName: null,
    StartDate: moment().format("DD/MM/YYYY"),
    EndDate: null,
    RepeatEvery: null,
    Frecuency: null,
    TermDays: null,
    CreateAction: null,
    CreateEmail: null,
    RecurringStatus: null,
    RecurringID: null
  }

  constructor(public loginService: LoginService,
              public organizationService: OrganizacionService,
              public router: Router,
              public terminosService: PagosService,
              public commonService: CommonService,
              public recurrentesService: RecurrentesService) { }

  // combos
  terminos = null;
  mySelect = [];
  selectedKey : any;

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;

      var organizationID = this.organizationService.getID();
      this.terminosService.getTerminosNombres(organizationID)
        .subscribe(res => {
          this.terminos = res;
      });
    }
    else{
      this.router.navigate(['/']);
    }
  }

  createRecurrente() {
    this.re.RecurringTypeCode = '2';
    this.re.CreateAction = '500';
    this.re.CreateEmail = 'carlos.jorge@tecnofun.es';
    this.re.RecurringStatus = '810';
    this.recurrentesService.createRecurrente(this.re)
      .subscribe(res => {
        if(res['resultado'] == 'OK') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res['mensaje'],
            showConfirmButton: false,
            timer: 1500
          });
        }
        // Puede ir a añadir o actualizar
        this.router.navigate(['/recurrentes/añadir']);
      });
  }

  selectChange() {
    this.selectedKey = this.commonService.getDropDownText(this.mySelect, this.terminos)[0].id;
    this.re.TermDays = this.selectedKey;
  }

  // Revisar volver a este componente con el flagger
  newTermino(){
    this.commonService.setFlagger('1');
    this.router.navigate(['/terminos-pagos/añadir']);
  }

}
