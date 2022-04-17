import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

//componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';


//asdjnaksjd
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { LANGUAGE_CODE } from '@angular/fire/compat/auth';
import { PERSISTENCE } from '@angular/fire/compat/auth';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import {provideAuth,getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
    provideAuth(() => getAuth()), // ToastrModule added
    
  ],
  
  providers: [
    // ... Existing Providers
    // { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
    // { provide: USE_DEVICE_LANGUAGE, useValue: true }, { provide: LANGUAGE_CODE, useValue: 'es' }, 
    // { provide: LANGUAGE_CODE, useValue: 'en' },
    // { provide: PERSISTENCE, useValue: 'session' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
