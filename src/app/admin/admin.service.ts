import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = environment.baseUrl;
  constructor(private Http: HttpClient) { }

  GetCategories(){return this.Http.get<{message:string}>(this.url+'/api/user/register');}


}

