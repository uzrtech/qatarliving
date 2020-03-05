import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  constructor(private http: HttpClient) { }

  url = environment.baseUrl;
  User;
  posts=[];
  ngOnInit() {
    var id = localStorage.getItem('_id');
    this.http.post<{message:String, data:String}>(this.url+"/api/getuser",{_id: id}).subscribe(data=>{
      this.User = data.data;
      this.posts=this.User.posts;
      console.log(this.User);
      
    })
  }
}
