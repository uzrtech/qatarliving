import { Component, OnInit } from '@angular/core';
import{ AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ErrorMessage="";
  private errSub : Subscription;
  constructor(private Auth: AuthService, private router:Router) {}
  ngOnInit() {
    this.errSub=this.Auth.updateError().subscribe((err)=>{this.ErrorMessage = err;})
  }
  login(formData){
    if(formData.email==""){this.ErrorMessage="Enter Email";}
    else if(formData.password==""){this.ErrorMessage="Enter Password";}
    else{this.ErrorMessage="";
    this.Auth.DocterLogin(formData);
  }
  }
}
