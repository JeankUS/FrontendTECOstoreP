import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MiperfilComponent } from './components/miperfil/miperfil.component';
import { RegisterComponent } from './components/register/register.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { MyproductsComponent } from './components/myproducts/myproducts.component';

const routes: Routes = [
  {path:'',redirectTo:'Home', pathMatch:"full"},
  {path:'Home',component: HomeComponent},
  {path:'Login',component: LoginComponent},
  {path:'Register',component: RegisterComponent},
  {path:'Miperfil',component: MiperfilComponent},
  {path:'Addproducts',component: AddproductsComponent},
  {path:'Myproducts',component: MyproductsComponent},
  {path:'**',redirectTo:'Home', pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
