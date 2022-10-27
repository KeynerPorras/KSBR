import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { MesasModule } from './mesas/mesas.module';
import { ProductosModule } from './productos/productos.module';
import { ComandasModule } from './comandas/comandas.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // importar HttpClientModule después BrowserModule.
    // comunicarse con un servidor a través del protocolo HTTP
    HttpClientModule, // Debe agregar el import respectivo
    // importar otras dependencias que sean necesario cargar en el componente principal.

    // importar los módulos creados propios en orden
    BrowserAnimationsModule,
    CoreModule,
    ShareModule,
    HomeModule,
    MesasModule,
    ProductosModule,
    ComandasModule,
    // al final el gestor de las rutas principal
    AppRoutingModule,
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
