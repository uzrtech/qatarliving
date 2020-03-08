import { AuthGuard } from './auth/auth.guard';
import { AdminloginComponent } from './auth/adminlogin/adminlogin.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginnComponent } from './auth/loginn/loginn.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule} from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { PostfilterPipe } from './postfilter.pipe';
import {MatProgressSpinnerModule, MatExpansionModule, MatFormFieldModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, MatMenuModule, MatSnackBarModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FooterComponent } from './home/footer/footer.component';
import { TimepipePipe } from './admin/timepipe.pipe';
import { SubCatFieldsComponent } from './admin/sub-cat-fields/sub-cat-fields.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HomeSideComponent } from './home/home-side/home-side.component';
import { HeaderComponent } from './home/header/header.component';
import { SearchComponent } from './home/search/search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SingleAdComponent } from './home/single-ad/single-ad.component';
import { NewsComponent } from './home/news/news.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    PostfilterPipe,
    AdminComponent,
    AuthComponent,
    LoginnComponent,
    AdminloginComponent,
    RegisterComponent,
    DashboardComponent,
    FooterComponent,
    TimepipePipe,
    SubCatFieldsComponent,
    HomeSideComponent,
    HeaderComponent,
    SearchComponent,
    UserProfileComponent,
    SingleAdComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,MatExpansionModule,
    BrowserAnimationsModule,
    MatSidenavModule,MatIconModule,MatToolbarModule,MatListModule,MatMenuModule, MatSnackBarModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
