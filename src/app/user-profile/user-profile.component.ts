import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  url = environment.baseUrl;
  User;
  ngOnInit() {
    var id = localStorage.getItem('_id');
    this.http.post<{}>(this.url+"/api/getuser", id);
  }

}
