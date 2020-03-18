import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-ad',
  templateUrl: './single-ad.component.html',
  styleUrls: ['./single-ad.component.css']
})
export class SingleAdComponent implements OnInit {

  constructor(private route: ActivatedRoute, private Http: HttpClient) { }

  url = environment.baseUrl;
  postID;
  post;
  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.postID = params['id'];
      this.Http.post<{message:String, post:String}>(this.url+'/api/singlepost',{_id:this.postID}).subscribe(post=>{
        this.post = post.post;
        console.log(this.post);
        
      })
    })
  }

}
