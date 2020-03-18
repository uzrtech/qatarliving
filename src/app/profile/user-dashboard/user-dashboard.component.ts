import { ProfileService } from './../profile.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.UserSub.unsubscribe();
  }
  constructor(private http: HttpClient, private ProfileService: ProfileService,private _snackBar:MatSnackBar) { 
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
DeletePost(post){
  this.http.post<{message:String, data:String}>(this.url+"/api/post/delete",{_id:post._id}).subscribe(data=>{
    this.openSnackBar('Post Deleted');
    this.posts.splice(this.posts.indexOf(post),1);
  })
}

openSnackBar(message: string) {
  this._snackBar.open(message, 'Ok', {
    duration: 2000,
  });
}
}
