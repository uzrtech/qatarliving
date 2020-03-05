import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient, private Router:Router) { }

  url = environment.baseUrl;
  User;
  username='';
  ngOnInit() {
    var id = localStorage.getItem('_id');
    this.http.post<{message:String, data:String}>(this.url+"/api/getuser",{_id: id}).subscribe(data=>{
      this.User = data.data;
      this.username= this.User.name;
    })
  }
  logout(){
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.Router.navigate(['/']);
  };

}
