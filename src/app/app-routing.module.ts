import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';

import { AbonosComponent } from './componentes/abonos/abonos.component';
import { AbonosAddComponent } from './componentes/abonos/abonos-add/abonos-add.component';

import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { CategoriasAddComponent } from './componentes/categorias/categorias-add/categorias-add.component';

import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ClientesAddComponent } from './componentes/clientes/clientes-add/clientes-add.component';

import { ContactosComponent } from './componentes/contactos/contactos.component';
import { ContactosAddComponent } from './componentes/contactos/contactos-add/contactos-add.component';

import { FacturasComponent } from './componentes/facturas/facturas.component';
import { FacturasAddComponent } from './componentes/facturas/facturas-add/facturas-add.component';
import { FacturasLineasComponent } from './componentes/facturas-lineas/facturas-lineas.component';

import { LoginComponent } from './componentes/login/login.component';
import { UserAddComponent } from './componentes/login/user-add/user-add.component';
import { UserComponent } from './componentes/user/user.component';

import { OrganizacionComponent } from './componentes/organizacion/organizacion.component';
import { OrganizacionAddComponent} from './componentes/organizacion/organizacion-add/organizacion-add.component';
import { OrganizacionPredeterminadaComponent } from './componentes/organizacion-predeterminada/organizacion-predeterminada.component';

import { PresupuestosComponent } from './componentes/presupuestos/presupuestos.component';
import { PresupuestosAddComponent } from './componentes/presupuestos/presupuestos-add/presupuestos-add.component';
import { PresupuestosLineasComponent } from './componentes/presupuestos-lineas/presupuestos-lineas.component';

import { ProductosComponent } from './componentes/productos/productos.component';
import { ProductosAddComponent } from './componentes/productos/productos-add/productos-add.component';

import { RecurrentesComponent } from './componentes/recurrentes/recurrentes.component';
import { RecurrentesAddComponent } from './componentes/recurrentes/recurrentes-add/recurrentes-add.component';
import { RecurringCabeceraComponent } from './componentes/recurring-cabecera/recurring-cabecera.component';

import { ImpuestosComponent } from './componentes/impuestos/impuestos.component';
import { ImpuestosAddComponent } from './componentes/impuestos/impuestos-add/impuestos-add.component';

import { UsuorgAddComponent } from './componentes/usuorg/usuorg-add/usuorg-add.component';
import { UsuorgComponent} from './componentes/usuorg/usuorg.component';

import { PagosComponent} from  './componentes/pagos/pagos.component';
import { PagosAddComponent} from  './componentes/pagos/pagos-add/pagos-add.component';

import { PagosrecibidosComponent } from './componentes/pagosrecibidos/pagosrecibidos.component';
import { PagosrecibidosAddComponent } from './componentes/pagosrecibidos/pagosrecibidos-add/pagosrecibidos-add.component';

import { AjustesComponent } from './componentes/ajustes/ajustes.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'ajustes',
    component: AjustesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/:añadir',
    component: UserAddComponent
  },
  {
    path: 'abonos',
    component: AbonosComponent
  },
  {
    path: 'abonos/:añadir',
    component: AbonosAddComponent
  },
  {
    path: 'pagos',
    component: PagosrecibidosComponent
  },
  {
    path: 'pagos/:añadir',
    component: PagosrecibidosAddComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: 'categorias/:añadir',
    component: CategoriasAddComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'clientes/:añadir',
    component: ClientesAddComponent
  },
  {
    path: 'contactos',
    component: ContactosComponent
  },
  {
    path: 'contactos/:añadir',
    component: ContactosAddComponent
  },
  {
    path: 'facturas',
    component: FacturasComponent
  },
  {
    path: 'facturas/:añadir',
    component: FacturasAddComponent
  },
  {
    path: 'facturas-lineas',
    component: FacturasLineasComponent
  },
  {
    path: 'organizaciones',
    component: OrganizacionComponent,
  },
  {
    path: 'organizaciones/:añadir',
    component: OrganizacionAddComponent
  },
  {
    path: 'organizacion-predeterminada',
    component: OrganizacionPredeterminadaComponent
  },
  {
    path: 'presupuestos',
    component: PresupuestosComponent
  },
  {
    path: 'presupuestos/:añadir',
    component: PresupuestosAddComponent
  },
  {
    path: 'presupuestos-lineas',
    component: PresupuestosLineasComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'productos/:añadir',
    component: ProductosAddComponent
  },
  {
    path: 'recurrentes',
    component: RecurrentesComponent
  },
  {
    path: 'recurrentes/:añadir',
    component: RecurrentesAddComponent
  },
  {
    path: 'recurrentes-cabecera',
    component: RecurringCabeceraComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'impuestos',
    component: ImpuestosComponent
  },
  {
    path: 'impuestos/:añadir',
    component: ImpuestosAddComponent
  },
  {
    path: 'terminos-pagos',
    component: PagosComponent
  },
  {
    path: 'terminos-pagos/:añadir',
    component: PagosAddComponent
  },
  {
    path: 'usuarios-permisos',
    component: UsuorgComponent
  },
  {
    path: 'usuarios-permisos/:añadir',
    component: UsuorgAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
