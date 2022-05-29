import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MiperfilComponent } from './components/miperfil/miperfil.component';
import { RegisterComponent } from './components/register/register.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { MyproductsComponent } from './components/myproducts/myproducts.component';
import { ReloadMyProductsComponent } from './components/reload-my-products/reload-my-products.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';

const routes: Routes = [
  {path:'',redirectTo:'Home', pathMatch:"full"},
  {path:'Home',component: HomeComponent},
  {path:'Login',component: LoginComponent},
  {path:'Register',component: RegisterComponent},
  {path:'Miperfil',component: MiperfilComponent},
  {path:'Addproducts',component: AddproductsComponent},
  {path:'Myproducts',component: MyproductsComponent},
  {path:'ReloadMyproducts',component: ReloadMyProductsComponent},
  {path:'Products',component: ProductsFilterComponent},
  {path:'Pruebas',component: PruebasComponent},
  {path:'**',redirectTo:'Home', pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
