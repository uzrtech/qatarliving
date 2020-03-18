import { ProfileService } from './../profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-single-post',
  templateUrl: './user-single-post.component.html',
  styleUrls: ['./user-single-post.component.css']
})
export class UserSinglePostComponent implements OnInit {
  constructor(private route: ActivatedRoute, private profileService: ProfileService) { }
  PostID;
  User;
  Post;
  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.PostID = params.get('postid');
      this.User = this.profileService.GetUser();
      this.Post = this.User.Posts.find(_post=>{ return _post._id==this.PostID});
      console.log(this.Post);
      
    })
  }
}
