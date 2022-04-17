import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'Home', pathMatch:'full'},
  {path:'Home',component: HomeComponent},
  {path:'Login',component: LoginComponent},
  {path:'Register',component: RegisterComponent},
  {path:'**',redirectTo:'Home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
