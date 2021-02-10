import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContactosComponent } from './componentes/contactos/contactos.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';

import { ProductosComponent } from './componentes/productos/productos.component';
import { ProductosAddComponent } from './componentes/productos/productos-add/productos-add.component';

import { OrganizacionComponent } from './componentes/organizacion/organizacion.component';
import { OrganizacionAddComponent } from './componentes/organizacion/organizacion-add/organizacion-add.component';


import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { CategoriasAddComponent } from './componentes/categorias/categorias-add/categorias-add.component';


import { RecurrentesComponent } from './componentes/recurrentes/recurrentes.component';
import { FacturasComponent } from './componentes/facturas/facturas.component';
import { AbonosComponent } from './componentes/abonos/abonos.component';
import { PresupuestosComponent } from './componentes/presupuestos/presupuestos.component';


import { LoginComponent } from './componentes/login/login.component';
import { UserComponent } from './componentes/user/user.component';

import { ClientesAddComponent } from './componentes/clientes/clientes-add/clientes-add.component';
import { ContactosAddComponent } from './componentes/contactos/contactos-add/contactos-add.component';
import { UserAddComponent } from './componentes/login/user-add/user-add.component';
import { FooterComponent } from './componentes/footer/footer.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipe } from './componentes/pipes/filter.pipe';
import { FilterOrgPipe } from './componentes/pipes/filter-org.pipe';
import { FilterConPipe } from './componentes/pipes/filter-con.pipe';
import { FilterCliPipe } from './componentes/pipes/filter-cli.pipe';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { OrganizacionPredeterminadaComponent } from './componentes/organizacion-predeterminada/organizacion-predeterminada.component';
import { ImpuestosComponent } from './componentes/impuestos/impuestos.component';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { ImpuestosAddComponent } from './componentes/impuestos/impuestos-add/impuestos-add.component';
import { FilterImpPipe } from './componentes/pipes/filter-imp.pipe';
import { FilterProPipe } from './componentes/pipes/filter-pro.pipe';

import { NgxPaginationModule } from 'ngx-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// carga de ficheros
import { FileuploadService } from './servicios/fileupload.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PagosAddComponent } from './componentes/pagos/pagos-add/pagos-add.component';
import { FilterTermPipe } from './componentes/pipes/filter-term.pipe';
import { FacturasAddComponent } from './componentes/facturas/facturas-add/facturas-add.component';
import { PagosrecibidosComponent } from './componentes/pagosrecibidos/pagosrecibidos.component';
import { AjustesComponent } from './componentes/ajustes/ajustes.component';
import { FacturasLineasComponent } from './componentes/facturas-lineas/facturas-lineas.component';
import { FilterFacPipe } from './componentes/pipes/filter-fac.pipe';

// pdf
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { UsuorgComponent } from './componentes/usuorg/usuorg.component';
import { UsuorgAddComponent } from './componentes/usuorg/usuorg-add/usuorg-add.component';
import { FilterUsuorgPipe } from './componentes/pipes/filter-usuorg.pipe';
import { PresupuestosLineasComponent } from './componentes/presupuestos-lineas/presupuestos-lineas.component';
import { PresupuestosAddComponent } from './componentes/presupuestos/presupuestos-add/presupuestos-add.component';
import { FiltrePrePipe } from './componentes/pipes/filtre-pre.pipe';
import { PagosrecibidosAddComponent } from './componentes/pagosrecibidos/pagosrecibidos-add/pagosrecibidos-add.component';
import { FilterPagosPipe } from './componentes/pipes/filter-pagos.pipe';
import { AbonosAddComponent } from './componentes/abonos/abonos-add/abonos-add.component';
import { RecurrentesAddComponent } from './componentes/recurrentes/recurrentes-add/recurrentes-add.component';
import { RecurringCabeceraComponent } from './componentes/recurring-cabecera/recurring-cabecera.component';

PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    ContactosComponent,
    ClientesComponent,
    ProductosComponent,
    CategoriasComponent,
    RecurrentesComponent,
    FacturasComponent,
    AbonosComponent,
    PresupuestosComponent,
    OrganizacionComponent,
    OrganizacionAddComponent,
    LoginComponent,
    UserComponent,
    OrganizacionAddComponent,
    CategoriasAddComponent,
    ProductosAddComponent,
    ClientesAddComponent,
    ContactosAddComponent,
    UserAddComponent,
    FooterComponent,
    FilterPipe,
    FilterOrgPipe,
    FilterConPipe,
    FilterCliPipe,
    InicioComponent,
    OrganizacionPredeterminadaComponent,
    ImpuestosComponent,
    PagosComponent,
    ImpuestosAddComponent,
    FilterImpPipe,
    FilterProPipe,
    PagosAddComponent,
    FilterTermPipe,
    FacturasAddComponent,
    PagosrecibidosComponent,
    AjustesComponent,
    FacturasLineasComponent,
    FilterFacPipe,
    UsuorgComponent,
    UsuorgAddComponent,
    FilterUsuorgPipe,
    PresupuestosLineasComponent,
    PresupuestosAddComponent,
    FiltrePrePipe,
    PagosrecibidosAddComponent,
    FilterPagosPipe,
    AbonosAddComponent,
    RecurrentesAddComponent,
    RecurringCabeceraComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [
    FileuploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
