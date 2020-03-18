import { log } from 'util';
import { ProfileService } from './../profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.UserSub.unsubscribe();
  }
  constructor(private http: HttpClient, private ProfileService: ProfileService) { 
  }
  url = environment.baseUrl;
  User;
  posts;
  UserSub: Subscription;
  ngOnInit() {
    this.User=this.ProfileService.GetUser();
    this.UserSub = this.ProfileService.GetUserU.subscribe(data=>{
      this.User=data;this.posts=this.User.Posts;
      console.log(this.posts);
    }
      )
    // var id = localStorage.getItem('_id');
    // this.http.post<{message:String, data:String}>(this.url+"/api/getuser",{_id: id}).subscribe(data=>{
    //   this.User = data.data;
    //   this.posts=this.User.Posts;
    //   console.log(this.User);
    //   console.log(this.posts);
    // })
  }
}
