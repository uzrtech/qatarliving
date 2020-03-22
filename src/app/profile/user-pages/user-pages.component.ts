import { MatSnackBar } from '@angular/material';
import { ProfileService } from './../profile.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-pages',
  templateUrl: './user-pages.component.html',
  styleUrls: ['./user-pages.component.css']
})
export class UserPagesComponent implements OnInit {
  public ProfileForm = new FormGroup({
    title: new  FormControl('', Validators.required),
    category: new  FormControl('0',Validators.required),
    city: new  FormControl('',Validators.required),
    des: new  FormControl('',Validators.required),
  });

  ngOnDestroy(): void {this.UserSub.unsubscribe();}
  constructor(private http: HttpClient, private ProfileService:ProfileService, private _snackBar:MatSnackBar){}
  url = environment.baseUrl;
  User;
  EMessage;
  Pages;
  fileData;
  S_page;
  previewUrl;
  UserSub: Subscription;
  ngOnInit() {
    this.UserSub = this.ProfileService.GetUserU.subscribe(data=>{
      this.User= data;
      this.Pages = this.User.page? this.User.page: [];
      this.S_page= this.Pages? this.Pages[0] : null;
    })
  }
  openSnackBar(message: string) {this._snackBar.open(message, 'Ok', {duration: 2000,})}
  DeletePost(post){
    this.http.post<{message:String, data:String}>(this.url+"/api/post/delete",{_id:post._id}).subscribe(data=>{
      this.openSnackBar('Post Deleted');
      this.Pages.splice(this.Pages.indexOf(post),1);
    })
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    if(this.fileData.size > 2000000){this.openSnackBar("Max file size of 2 Mb excceded");return;}
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {return;}
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => {this.previewUrl = reader.result; }
  }
  Deletepage(post){this.Pages.splice(this.Pages.indexOf(post),1);}


  formSubmit(values){
    console.log('submitttt');
    if(values.title=='' ||values.city=='' ||values.address==''){
      this.EMessage=="Complete All Fields";
    }
    var id = localStorage.getItem('_id');
    values._id=id;
    var formData = new FormData();
    formData.append('_id',id);
    formData.append('title',values.title);
    formData.append('category','page');
    formData.append('page',this.S_page._id);
    formData.append('subcategory',values.category);
    formData.append('des',values.des);
    if(this.fileData){
      formData.append('image',this.fileData,'image');
    }
      this.http.post<{message:String, data:String}>(this.url+"/api/post",formData).subscribe(data=>{
        this.openSnackBar('Page Added');
        // this.User.page.push(data.data);
        // this.ProfileService.UpdateUser(this.User);
      })
  }

}
