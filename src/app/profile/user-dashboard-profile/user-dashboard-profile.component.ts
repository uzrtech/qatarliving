import { Subscription } from 'rxjs';
import { ProfileService } from './../profile.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-dashboard-profile',
  templateUrl: './user-dashboard-profile.component.html',
  styleUrls: ['./user-dashboard-profile.component.css']
})
export class UserDashboardProfileComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.UserSub.unsubscribe();
  }
  constructor(private http: HttpClient, private ProfileService:ProfileService) {
   }

  url = environment.baseUrl;
  User;
  UserSub: Subscription;
  ngOnInit() {
    //this.User=this.ProfileService.GetUser();
    this.UserSub = this.ProfileService.GetUserU.subscribe(data=>{
      console.log("data");
      console.log(data);
      
      this.User=data;
      console.log("this.User");
      console.log(this.User);
    })
  }
  formSubmit(values){
    var id = localStorage.getItem('_id');
    values._id= id;
    this.http.post<{message:String, data:String}>(this.url+"/api/updateuser",values).subscribe(data=>{
    })
    
  }
}
