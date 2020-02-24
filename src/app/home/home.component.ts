import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading= true;
  Posts;
  PostsSub :Subscription;
  Categories;
  SubCategories;
  Selected_Category;
  CategoryFilter;
  CategoryFilterr;
  typeFilter;
  types;
  type;
  Selected_SubCategory;
  constructor(private HomeService:HomeService) { }

  ngOnInit() {
    this.HomeService.GetCategories().subscribe(Cats=>{
      this.Categories = Cats.data;
    })
    this.PostsSub = this.HomeService.GetPosts().subscribe(_posts=>{this.Posts=_posts;this.loading=false});
  }
  CategoryChange(index){
    if(index==0){this.CategoryFilter=null;return};
    this.Selected_Category =this.Categories[index-1];
    console.log(this.Selected_Category);
    
    this.CategoryFilter=this.Selected_Category.name;
    this.CategoryFilterr=null;
    this.SubCategories= this.Categories[index-1].cat;
  }
  SubCategoryChange(index){
    this.Selected_SubCategory= this.Selected_Category.cat[index-1];
    this.CategoryFilterr= this.Selected_SubCategory.name;
    this.types = this.Selected_SubCategory.sub;
  }
  TypeChange(index){
    this.type= this.types[index-1];
    this.typeFilter= this.type;
  }

}
