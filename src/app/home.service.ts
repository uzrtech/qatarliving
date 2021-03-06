import { log } from 'util';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import{ Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  PostSub = new Subject<string>();
  Posts;
  url= environment.baseUrl;

  constructor(private Http: HttpClient) {
    this.Http.get<{message:string, posts:String}>(this.url+'/api/posts').subscribe(_posts=>{
      this.Posts=_posts.posts;
      this.PostSub.next(this.Posts);
    })
    
   }
  GetCategories(){ return this.Http.get<{message:string, data:String,newsCategories:String}>(this.url+'/api/categories') }
  GetPosts(){ return this.PostSub.asObservable(); }
  AddPost(post,file:File){
    const formData = new FormData();
    formData.append('image', file);
    formData.append('post',post);
    // formData.append('des', post.des);
    // formData.append('price', post.price);
    // if(post.city){formData.append('city', post.city);}
    // if(post.bedrooms){formData.append('bedrooms', post.bedrooms);}
    // if(post.washrooms){formData.append('washrooms', post.washrooms);}    
    // formData.append('category', post.category);
    // formData.append('subcategory', post.subcategory);
    // formData.append('type', post.type);
    
    return this.Http.post<{message:string,data:string}>(this.url+'/api/post',post);
  }
  
  PostsByCat(name,sub){
    this.Http.post<{message:string, posts:String}>(this.url+'/api/posts/category',{name:name, sub:sub}).subscribe(_posts=>{
      this.Posts=_posts.posts;
      this.PostSub.next(this.Posts);
    })
  }
  GetUser( ){
    var id = localStorage.getItem('_id');
    return this.Http.post<{message:String, data:String}>(this.url+"/api/getuser",{_id: id});
  }

  AddPostShowroom( post_id){
    var id = localStorage.getItem('_id');
    return this.Http.post<{message:String, data:String}>(this.url+"/api/getuser",{_id: id});
  }


}
