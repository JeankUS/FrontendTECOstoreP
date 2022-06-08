import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
//externos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//Google - Firebase
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import {provideAuth,getAuth } from '@angular/fire/auth';
import { provideStorage,getStorage } from '@angular/fire/storage';
//componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MiperfilComponent } from './components/miperfil/miperfil.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { MyproductsComponent } from './components/myproducts/myproducts.component';
import { ReloadMyProductsComponent } from './components/reload-my-products/reload-my-products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    MiperfilComponent,
    AddproductsComponent,
    MyproductsComponent,
    ReloadMyProductsComponent,
    PruebasComponent,
    ProductsFilterComponent,
    ProductDetailsComponent,
    FooterComponent,
    AcercaDeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), 
    provideAuth(() => getAuth()), // ToastrModule added
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
    NgxPaginationModule
    
  ],
  
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  


}
