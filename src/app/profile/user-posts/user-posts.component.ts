import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  constructor(private http: HttpClient) { }

  url = environment.baseUrl;
  User;
  posts=[];
  ngOnInit() {
    var id = localStorage.getItem('_id');
    this.http.post<{message:String, data:String}>(this.url+"/api/getuser",{_id: id}).subscribe(data=>{
      this.User = data.data;
      this.posts=this.User.Posts;
      console.log(this.User);
      console.log(this.posts);
    })
  }
}
