import { FormsModule } from '@angular/forms';
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




@NgModule({
  declarations: [ProfileComponent, UserDashboardComponent, UserDashboardProfileComponent, UserAddPostComponent, UserPasswordChangeComponent, UserPostsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    MatSnackBarModule
  ]
})
export class ProfileModule { }
