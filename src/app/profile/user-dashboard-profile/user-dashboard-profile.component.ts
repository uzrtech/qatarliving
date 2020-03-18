import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { ProfileService } from './../profile.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard-profile',
  templateUrl: './user-dashboard-profile.component.html',
  styleUrls: ['./user-dashboard-profile.component.css']
})
export class UserDashboardProfileComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.UserSub.unsubscribe();
  }
  constructor(private http: HttpClient, private ProfileService:ProfileService, private _snackBar:MatSnackBar) {
   }

   public ProfileForm = new FormGroup({
     name: new  FormControl(''),
     email: new  FormControl(''),
     phone: new  FormControl(''),
     address: new  FormControl(''),
   });
  url = environment.baseUrl;
  User;
  EMessage;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  selectedFile;
  UserSub: Subscription;
  ngOnInit() {
    //this.User=this.ProfileService.GetUser();
    this.UserSub = this.ProfileService.GetUserU.subscribe(data=>{
      this.User= data;
      this.ProfileForm.controls['name'].setValue(this.User.name);
      this.ProfileForm.controls['email'].setValue(this.User.email);
      this.ProfileForm.controls['phone'].setValue(this.User.phone);
      this.ProfileForm.controls['address'].setValue(this.User.address);
    })
  }
  formSubmit(values){
    var id = localStorage.getItem('_id');
    values._id=id;
    var formData = new FormData();
    formData.append('values',JSON.stringify(values));
    if(this.fileData){
      formData.append('image',this.fileData,'image');
    }
    this.http.post<{message:String, data:String}>(this.url+"/api/updateuser",formData).subscribe(data=>{
      console.log('res');
      this.openSnackBar('Profile Updated')
      console.log(data);
      
      
    })
    
  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    if(this.fileData.size > 2000000)
    {
      console.log("Max size of 2 Mb excceded");
      this.EMessage= 'Max size of 2 Mb excceded';
      return;
    }
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
    return;
    }
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }


  
}

openSnackBar(message: string) {
  this._snackBar.open(message, 'Ok', {
    duration: 2000,
  });
}

}
