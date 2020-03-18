import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnInit {
  constructor(private http: HttpClient,) { }
  url = environment.baseUrl;
  User;
  UserSub= new BehaviorSubject<String>('');
  GetUserU = this.UserSub.asObservable();
  ngOnInit() {this.GetUserData();}
  GetUser(){return this.User};
  UpdateUser(User){this.User=User;this.UserSub.next(User)};
  GetUserData(){var id = localStorage.getItem('_id');this.http.post<{message:String, data:String}>(this.url+"/api/getuser",{_id: id}).subscribe(data=>{this.UserSub.next(data.data);this.User=data.data;})
  }
}
