import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-loginn',
  templateUrl: './loginn.component.html',
  styleUrls: ['./loginn.component.css']
})
export class LoginnComponent implements OnInit {
  ErrorMessage="";
  private errSub : Subscription;
  constructor(private Auth: AuthService) {}
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
