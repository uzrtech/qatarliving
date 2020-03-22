import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  constructor(private http: HttpClient) { }
  url= environment.baseUrl;
  Pages=[];
  Categories=[];
  ngOnInit() {
  this.http.get<{message:String, pages:String,categories:String}>(this.url+"/api/pages")
  .subscribe(data=>{this.Pages=[...data.pages];this.Categories=[...data.categories]})
  }
}
