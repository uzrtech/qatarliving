import { AdminloginComponent } from './auth/adminlogin/adminlogin.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginnComponent } from './auth/loginn/loginn.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
const routes: Routes = [
  
  {path:"post", component:PostComponent},
  {path:"admin", component:AdminComponent, children:[
    {path:'', component: DashboardComponent}
  ]},
  {path :'auth', component:AuthComponent,children:[
    {path:'', component: LoginnComponent},
    {path:'register', component: RegisterComponent},
    {path:'admin', component: AdminloginComponent},
  ]},
  // {path :'auth', loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)},
  {path:"", component:HomeComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
