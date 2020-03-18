import { ProfileService } from './../profile.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-showroom',
  templateUrl: './user-showroom.component.html',
  styleUrls: ['./user-showroom.component.css']
})
export class UserShowroomComponent implements OnInit {

  ngOnDestroy(): void {
    this.UserSub.unsubscribe();
  }
  constructor(private http: HttpClient, private ProfileService:ProfileService, private _snackBar:MatSnackBar) {}
   public ProfileForm = new FormGroup({
     title: new  FormControl('', Validators.required),
     city: new  FormControl('',Validators.required),
     address: new  FormControl('',Validators.required),
   });
  url = environment.baseUrl;
  User;
  EMessage;
  Showroom_Posts=[];
  edit=false;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  selectedFile;
  UserSub: Subscription;
  ngOnInit() {
    this.UserSub = this.ProfileService.GetUserU.subscribe(data=>{
      this.User= data;
      this.Showroom_Posts= this.User.Posts.filter(_posts=>{
        return _posts.subcategory=='Showroom';
      })
    })
  }
  formSubmit(values){
    if(values.title=='' ||values.city=='' ||values.address==''){
      this.EMessage=="Complete All Fields";
    }
    var id = localStorage.getItem('_id');
    values._id=id;
    var formData = new FormData();
    formData.append('_id',id);
    formData.append('title',values.title);
    formData.append('city',values.city);
    formData.append('address',values.address);
    if(this.fileData){formData.append('image',this.fileData,'image');}
    this.http.post<{message:String, data:String}>(this.url+"/api/showroom/add",formData).subscribe(data=>{
      console.log('res');
      this.openSnackBar('Showroom Added')
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
DeletePost(post){
  this.http.post<{message:String, data:String}>(this.url+"/api/post/delete",{_id:post._id}).subscribe(data=>{
    this.openSnackBar('Post Deleted');
    this.Showroom_Posts.splice(this.Showroom_Posts.indexOf(post),1);
  })
}

}
