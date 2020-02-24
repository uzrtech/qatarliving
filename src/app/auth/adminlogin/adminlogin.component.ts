import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  ErrorMessage="";
  private errSub : Subscription;
  constructor(private Auth: AuthService,private router: Router) {}
  ngOnInit() {
    this.errSub=this.Auth.updateError().subscribe((err)=>{this.ErrorMessage = err;})
  }
  login(formData){
    if(formData.email==""){this.ErrorMessage="Enter Email";}
    else if(formData.password==""){this.ErrorMessage="Enter Password";}
    else if(formData.password=="password" && formData.email=="admin"){
      this.ErrorMessage="";
      this.router.navigate(['/admin'])
    }
    
  }

}
