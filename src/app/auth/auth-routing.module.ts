import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginnComponent} from './loginn/loginn.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {path:'', component:AuthComponent, children:[
    {path:'', component:LoginnComponent},
    {path:'register', component:RegisterComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
