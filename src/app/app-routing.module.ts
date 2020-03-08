import { NewsComponent } from './home/news/news.component';
import { SingleAdComponent } from './home/single-ad/single-ad.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchComponent } from './home/search/search.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeSideComponent } from './home/home-side/home-side.component';
import { SubCatFieldsComponent } from './admin/sub-cat-fields/sub-cat-fields.component';
import { AuthGuard } from './auth/auth.guard';
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
  
  {path:"admin", component:AdminComponent, canActivate: [AuthGuard],data: { expectedRole: 'admin'},  children:[
    {path:'', component: DashboardComponent},
    {path:'subfields', component: SubCatFieldsComponent}
  ]},
  {path :'auth', component:AuthComponent,children:[
    {path:'', component: LoginnComponent},
    {path:'register', component: RegisterComponent},
    {path:'admin', component: AdminloginComponent},
  ]},
  // {path :'auth', loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)},
  {path:"", component:HeaderComponent, children:[
    {path:'', component: HomeComponent},
    // {path:'profile', component: UserProfileComponent},
    {path:'search/:category/:sub', component:SearchComponent},
    {path:'search/:category', component:SearchComponent},
    {path:'news', component:NewsComponent},
    {path:'single/:id', component:SingleAdComponent},
    {path:'post', component:PostComponent,canActivate: [AuthGuard]},
    { path: 'profile', canActivate:[AuthGuard], loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  ]},
  
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
