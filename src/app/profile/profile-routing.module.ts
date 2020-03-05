import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';
import { UserDashboardProfileComponent } from './user-dashboard-profile/user-dashboard-profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { UserAddPostComponent } from './user-add-post/user-add-post.component';

const routes: Routes = [{ path: '', component: ProfileComponent ,children:[
  { path:'', component:UserDashboardComponent},
  { path:'settings', component:UserDashboardProfileComponent},
  { path:'add', component:UserAddPostComponent},
  { path:'changepassword', component:UserPasswordChangeComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
