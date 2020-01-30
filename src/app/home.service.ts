import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './models/items-model';
import { Property } from './models/property-model';
import { Vehicle } from './models/vehicle-model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  item = Item;
  property =Property;
  vehicle = Vehicle;
  lc="http://localhost:8080";

  constructor(private Http: HttpClient) {
    
   }
  GetCategories(){ return this.Http.get<{message:string, categories:String}>('/api/categories') }
  GetPosts(){ return this.Http.get<{message:string, posts:String}>('/api/posts') }
  AddPost(post){
    return this.Http.post<{message:string,data:string}>('/api/post',post);
  }
}
