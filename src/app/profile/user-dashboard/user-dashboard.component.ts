import { ProfileService } from './../profile.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.UserSub.unsubscribe();
  }
  constructor(private http: HttpClient, private ProfileService: ProfileService) { 
  }
  url = environment.baseUrl;
  User;
  UserSub : Subscription;
  posts=[];
  ngOnInit() {
    this.User=this.ProfileService.GetUser();
    this.UserSub = this.ProfileService.GetUserU.subscribe(data=>{this.User=data;this.posts= this.User.Posts})
    // var id = localStorage.getItem('_id');
    // this.http.post<{message:String, data:String}>(this.url+"/api/getuser",{_id: id}).subscribe(data=>{
    //   this.User = data.data;
    //   this.posts=this.User.Posts;
    //   console.log(this.User);
    // })
}
}
