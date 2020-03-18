import { ProfileService } from './../../profile.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showroom-edit',
  templateUrl: './showroom-edit.component.html',
  styleUrls: ['./showroom-edit.component.css']
})
export class ShowroomEditComponent implements OnInit {

  ngOnDestroy(): void {
    this.UserSub.unsubscribe();
  }
  constructor(private http: HttpClient, private ProfileService:ProfileService,private route: ActivatedRoute, private _snackBar:MatSnackBar) {
   }

   public ProfileForm = new FormGroup({
     title: new  FormControl('', Validators.required),
     city: new  FormControl('',Validators.required),
     address: new  FormControl('',Validators.required),
   });
  url = environment.baseUrl;
  User;
  EMessage;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  selectedFile;
  Showroom_id;
  Mode='add';
  Showroom;
  UserSub: Subscription;
  ngOnInit() {
    this.UserSub = this.ProfileService.GetUserU.subscribe(data=>{
      this.User= data;
      this.route.paramMap.subscribe(params=>{
        this.Showroom_id=params.get('postid');
        if(this.Showroom_id){
          this.Showroom=this.User.showroom.find(_showroom=>{return _showroom._id==this.Showroom_id});
          this.ProfileForm.controls['title'].setValue(this.Showroom.title);
          this.ProfileForm.controls['city'].setValue(this.Showroom.city);
          this.ProfileForm.controls['address'].setValue(this.Showroom.address);
          this.previewUrl=this.Showroom.image;
          this.Mode = 'edit'
        }else{this.Mode='add'}
        
        
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
    if(this.fileData){
      formData.append('image',this.fileData,'image');
    }
    if(this.Mode=='add'){
      this.http.post<{message:String, data:String}>(this.url+"/api/showroom/add",formData).subscribe(data=>{
        this.User.showroom.push(data.data);
        this.ProfileService.UpdateUser(this.User);
        this.openSnackBar('Showroom Added');
      })
    }
    else{
      formData.append('showroom_id',this.Showroom_id);
      this.http.post<{message:String, data:String}>(this.url+"/api/showroom/update",formData).subscribe(data=>{
        console.log(data.data);
        this.Showroom=data.data;
        console.log(this.User);
        //this.ProfileService.UpdateUser(this.User);
        this.openSnackBar('Showroom Updated');
      })
    }
    
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
