import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  News;
  isLoading=false;
  EMessage='';
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  Categories;
  searchValue;
  url= environment.baseUrl;
  ngOnInit() {
    this.http.get<{message:String, news:String, categories:String}>(this.url+'/api/news').subscribe(data=>{
      this.News = data.news;
      this.Categories= data.categories;
      console.log(data);
      
    })

  }

  delCat(cate){
    this.http.post<{message:String,cate:String }>(this.url+'/api/news/cate/delete',{_id:cate._id}).subscribe(data=>{
      this.Categories.splice(this.Categories.indexOf(cate),1);
    })
  }
  addcategory(catForm){
    this.http.post<{message:String,cate:String }>(this.url+'/api/news/cate/add',{category:catForm.category}).subscribe(data=>{
      this.Categories.push(data.cate)
    })
  }

  addPost(values){
    this.isLoading=true;
    var formData = new FormData();
    formData.append('title',values.title);
    formData.append('category',values.category);
    formData.append('des',values.de);
    formData.append('image',this.fileData,'image');
    this.http.post<{message:String,news:String }>(this.url+'/api/news/add',formData).subscribe(data=>{
      this.News.push(data.news);
      this.isLoading=false;
    })
  }
  DelNews(n){
    this.http.post<{message:String,cate:String }>(this.url+'/api/news/delete',{_id:n._id}).subscribe(data=>{
      this.News.splice(this.News.indexOf(n),1);
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

}
