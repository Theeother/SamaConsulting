import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './elements/carousel/carousel.component';
import { FullPictureHeadingComponent } from './elements/full-picture-heading/full-picture-heading.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { EditProductsComponent } from './components/edit-products/edit-products.component';
import { RegisterComponent } from './components/register/register.component';
import { ComptabiliteComponent } from './components/comptabilite/comptabilite.component';
import { ProlabComponent } from './elements/prolab/prolab.component';
import { SesamComponent } from './elements/sesam/sesam.component';
import { ReviveComponent } from './elements/revive/revive.component';
import { WebComponent } from './elements/web/web.component';
//import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    
    FullPictureHeadingComponent,
    LoginComponent,
    CartComponent,
    EditProductsComponent,
    RegisterComponent,
    ComptabiliteComponent,
    ProlabComponent,
    SesamComponent,
    ReviveComponent,
    WebComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    //NgxImageZoomModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
