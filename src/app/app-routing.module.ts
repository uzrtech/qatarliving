import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
const routes: Routes = [
  
  {path:"post", component:PostComponent},
  {path :'auth', loadChildren: () => import(`./auth/loginn/loginn.component`).then(m => m.LoginnComponent)},
  {path:"", component:HomeComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
