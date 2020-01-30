import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';


const routes: Routes = [
  
  {path:"post", component:PostComponent},
  {path:'auth', component:AuthComponent, children: [
    {path:'', component: LoginComponent},
    {path:'register', component: RegisterComponent},
  ]},
  {path:"", component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
