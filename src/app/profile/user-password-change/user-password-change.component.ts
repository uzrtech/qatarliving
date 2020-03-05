import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.css']
})
export class UserPasswordChangeComponent implements OnInit {

  old;new;confirm;
  constructor(private http: HttpClient,private _snackBar: MatSnackBar) { }

  url = environment.baseUrl;
  ngOnInit() {
  }
  update(values){
    if(values.old==''){return};
    if(values.new !=values.confirm){return}
    var id = localStorage.getItem('_id');
    values._id= id;
    
    this.http.post<{message:String, data:String}>(this.url+"/api/updateuserpass",values).subscribe(data=>{
      console.log(data.data);
      this.openSnackBar("Password Updated", "Close");
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
