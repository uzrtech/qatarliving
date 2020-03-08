import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.UserSub.unsubscribe();
  }
  constructor(private ProfileService: ProfileService, private Router:Router) {
   }

  url = environment.baseUrl;
  User;
  UserSub: Subscription;
  ngOnInit() {
    this.UserSub = this.ProfileService.GetUserU.subscribe(data=>{this.User=data;})
    this.ProfileService.GetUserData();
    this.User=this.ProfileService.GetUser();
    
    // var id = localStorage.getItem('_id');
    // this.http.post<{message:String, data:String}>(this.url+"/api/getuser",{_id: id}).subscribe(data=>{
    //   this.User = data.data;
    //   this.username= this.User.name;
    // })
  }
  logout(){
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.Router.navigate(['/']);
  };

}
