import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../home.service';
import { Subscription} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  postSub: Subscription;

  constructor(private HomeService:HomeService, private route : ActivatedRoute, private router: Router) { }
  Selected_Category;
  SubCategory='';
  loading= true;
  Categories;
  Posts;
  ngOnInit() {
    this.postSub= this.HomeService.GetPosts().subscribe(data=>{
      this.Posts = data;
      this.loading=false;
    });
    this.HomeService.GetCategories().subscribe(Cats=>{
      this.Categories = Cats.data;
    });
    this.route.params.subscribe(params => {
      this.Selected_Category= params['category'];
      if(params.sub){
      this.SubCategory= params['sub'];
      }
      this.HomeService.PostsByCat(this.Selected_Category, this.SubCategory);
   });
}

CategoryChange(val){
  this.router.navigate(['/search',this.Categories[val-1].name])
  

}
}
