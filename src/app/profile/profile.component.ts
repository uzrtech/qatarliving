import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  url = environment.baseUrl;
  User;
  ngOnInit() {
    var id = localStorage.getItem('_id');
    this.http.post<{}>(this.url+"/api/getuser", id);
  }
  logout(){};

}
