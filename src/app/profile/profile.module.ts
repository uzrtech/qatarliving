import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardProfileComponent } from './user-dashboard-profile/user-dashboard-profile.component';
import { UserAddPostComponent } from './user-add-post/user-add-post.component';
import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserSinglePostComponent } from './user-single-post/user-single-post.component';
import { UserShowroomComponent } from './user-showroom/user-showroom.component';
import { ShowroomEditComponent } from './user-showroom/showroom-edit/showroom-edit.component';
import { UserPagesComponent } from './user-pages/user-pages.component';
import { UserPageEditComponent } from './user-pages/user-page-edit/user-page-edit.component';
import { MatFormFieldModule } from '@angular/material';



@NgModule({
  declarations: [ProfileComponent, UserDashboardComponent, UserDashboardProfileComponent, UserAddPostComponent, UserPasswordChangeComponent, UserPostsComponent, UserSinglePostComponent, UserShowroomComponent, ShowroomEditComponent, UserPagesComponent, UserPageEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ]
})
export class ProfileModule { }
