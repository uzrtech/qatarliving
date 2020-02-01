import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router'
import { Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Api_Url = "http://localhost:8080";
  private errSub = new Subject<string>();
  private AdminSub = new Subject<string>();
  private admin;
  
  //lc="http://localhost:8080";
  lc="";
  constructor(private Http: HttpClient, private router :Router ) {
    }
  DocterLogin(formData){
     return this.Http.post<{message:string, token:string, _id: string}>(this.lc+'/api/user/login',formData)
    .subscribe((userData)=>{
      localStorage.setItem('token', userData.token);
      localStorage.setItem('_id', userData._id);
      this.router.navigate(['/post']);
    },
     (err)=>{
       this.errSub.next(err.error.message);
     })
  }
  DoctorRegister(formData){
    return this.Http.post<{message:string}>(this.lc+'/api/user/register',formData);
  }
  DocterPasswordReset(email){
    this.Http.post<{message:string}>(this.lc+'/api/dashboard/reset',{email:email})
    .subscribe((userData)=>{console.log(userData.message);});
  }
  updateError(){return this.errSub.asObservable()};
  AdminUpdate(){return this.errSub.asObservable()};
}
