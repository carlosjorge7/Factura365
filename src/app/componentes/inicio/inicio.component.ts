import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  log: boolean = false;

  constructor(public loginService: LoginService,
              public router: Router) { }

  ngOnInit() {
    if(this.loginService.isLogginIn()){
      this.log = true;
    }
    else{
      this.router.navigate(['/']);
    }
  }

}
