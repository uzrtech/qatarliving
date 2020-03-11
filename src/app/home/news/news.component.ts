import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  News;
  Categories;
  Sele_News;
  loading=false;
  url= environment.baseUrl;
  ngOnInit() {
    this.loading = true;
    this.http.get<{message:String, news:String, categories:String}>(this.url+'/api/news').subscribe(data=>{
      this.loading = false;
      this.News = data.news;
      this.Categories=data.categories;
      this.Sele_News = this.News[0];
      console.log(this.News);
    })
  }

}
