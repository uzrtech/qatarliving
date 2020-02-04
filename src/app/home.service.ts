import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './models/items-model';
import { Property } from './models/property-model';
import { Vehicle } from './models/vehicle-model';
import{ Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  item = Item;
  property =Property;
  vehicle = Vehicle;
  PostSub = new Subject<string>();
  Posts;
  lc="http://localhost:8080";
  //lc="";

  constructor(private Http: HttpClient) {
    this.Http.get<{message:string, posts:String}>(this.lc+'/api/posts').subscribe(_posts=>{
      this.Posts=_posts.posts;
      this.PostSub.next(this.Posts);
    })
    
   }
  GetCategories(){ return this.Http.get<{message:string, categories:String}>(this.lc+'/api/categories') }
  GetPosts(){ return this.PostSub.asObservable(); }
  AddPost(post,file:File){
    const formData = new FormData();
    formData.append('image', file);
    formData.append('data', post);
    console.log(formData);
    
    return this.Http.post<{message:string,data:string}>(this.lc+'/api/post',formData);
  }

  postWithfile(fileData,uploadedFilePath) {
    const formData = new FormData();
      formData.append('file', fileData);
      this.Http.post<{formData:string}>('url/to/your/api', formData)
        .subscribe(res => {
          uploadedFilePath = res.formData;
          alert('SUCCESS !!');
        })
  }
  
}
