import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from './auth.component';
import {RegisterComponent} from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import {FormsModule} from '@angular/forms';
import { LoginnComponent } from './loginn/loginn.component';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginnComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
