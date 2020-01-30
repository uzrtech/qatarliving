import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ErrorMessage="";
  SuccessMessage="";
  ErrSub : Subscription;
  constructor(private Auth: AuthService, private router : Router) { }
  ngOnInit() {
    this.ErrSub = this.Auth.updateError().subscribe((err)=>{this.ErrorMessage=err});
  }
  register(formData){
      if(formData.name==""){this.ErrorMessage="Enter Name";return;}
      else if(formData.email==""){this.ErrorMessage="Enter Email";return;}
      else if(formData.password==""){this.ErrorMessage="Enter Password";return;}
      else if(formData.confirmPassword==""){this.ErrorMessage="Enter Password Again";return;}
      else if(formData.password!=formData.confirmPassword){this.ErrorMessage="Password Not Match";return;}
      else{this.ErrorMessage="";}
      this.Auth.DoctorRegister(formData)
      .subscribe((userData)=>{
        this.SuccessMessage="Registration Successful"
        this.router.navigate(['/auth']);
      });
  }
}
