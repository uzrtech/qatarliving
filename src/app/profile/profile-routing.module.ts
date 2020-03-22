import { UserPageEditComponent } from './user-pages/user-page-edit/user-page-edit.component';
import { UserPagesComponent } from './user-pages/user-pages.component';
import { UserShowroomComponent } from './user-showroom/user-showroom.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';
import { UserDashboardProfileComponent } from './user-dashboard-profile/user-dashboard-profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { UserAddPostComponent } from './user-add-post/user-add-post.component';
import { UserSinglePostComponent } from './user-single-post/user-single-post.component';
import { ShowroomEditComponent } from './user-showroom/showroom-edit/showroom-edit.component';

const routes: Routes = [{ path: '', component: ProfileComponent ,children:[
  { path:'', component:UserDashboardComponent},
  { path:'settings', component:UserDashboardProfileComponent},
  { path:'add', component:UserAddPostComponent},
  { path:'showroom', component:UserShowroomComponent},
  { path:'pages', component:UserPagesComponent},
  { path:'showroom/edit/:postid', component:ShowroomEditComponent},
  { path:'pages/edit/:pageid', component:UserPageEditComponent},
  { path:'pages/edit', component:UserPageEditComponent},
  { path:'post/:postid', component:UserSinglePostComponent},
  { path:'changepassword', component:UserPasswordChangeComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
