import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard-profile',
  templateUrl: './user-dashboard-profile.component.html',
  styleUrls: ['./user-dashboard-profile.component.css']
})
export class UserDashboardProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  url = environment.baseUrl;
  User;
  ngOnInit() {
    var id = localStorage.getItem('_id');
    this.http.post<{message:String, data:String}>(this.url+"/api/getuser",{_id: id}).subscribe(data=>{
      this.User = data.data;
    })
  }
  formSubmit(values){
    var id = localStorage.getItem('_id');
    values._id= id;
    console.log(values);
    this.http.post<{message:String, data:String}>(this.url+"/api/updateuser",values).subscribe(data=>{
      console.log(data.data);
      
    })
    
  }
}
