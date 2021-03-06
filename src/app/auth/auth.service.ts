import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router'
import { Subject} from 'rxjs';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private errSub = new Subject<string>();
  private AdminSub = new Subject<string>();
  private admin;
  lc=environment.baseUrl;
  constructor(private Http: HttpClient, private router :Router,private _snackBar: MatSnackBar ) {
    }
  DocterLogin(formData){
     return this.Http.post<{message:string, token:string, _id: string}>(this.lc+'/api/user/login',formData)
    .subscribe((userData)=>{
      localStorage.setItem('token', userData.token);
      localStorage.setItem('_id', userData._id);
      localStorage.setItem('role', 'user');
      this.openSnackBar("Login Successful", '');
      this.router.navigate(['/profile']);
    },
     (err)=>{
       console.log(err);
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
