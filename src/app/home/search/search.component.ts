import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../home.service';
import { Subscription} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { toTypeScript } from '@angular/compiler';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  postSub: Subscription;

  constructor(private HomeService:HomeService, private route : ActivatedRoute, private router: Router) { }
  Selected_Category;
  Curr_Category;
  SubCategory='';
  loading= true;
  Categories;
  Searchable = [];
  OPosts;
  Posts;
  ngOnInit() {
    this.postSub= this.HomeService.GetPosts().subscribe(data=>{
      this.OPosts =[...data];
      this.Posts = data;
      console.log(this.Posts);
      
      this.loading=false;
    });
    
    this.route.params.subscribe(params => {
      this.Selected_Category= params['category'];
      if(params.sub){
      this.SubCategory= params['sub'];
      }
      this.HomeService.GetCategories().subscribe(Cats=>{
        this.Categories = Cats.data;
        this.Curr_Category = this.Categories.filter(item=>{return item.name==this.Selected_Category});
        this.Searchable = this.Curr_Category[0].fields.filter(item=>{return item.search})
        console.log(this.Searchable);
        
      });
      this.HomeService.PostsByCat(this.Selected_Category, this.SubCategory);
   });
}

CategoryChange(val){
  this.router.navigate(['/search',this.Categories[val-1].name])
}
searchfilter(values){
  
         // {city:'city', Bedrooms:'4', Washromoms:'2'}


        // category: "Vehicles"
        // subcategory: "Rental"
        // type: "Car"
        // fields: Array(2)
        // 0: {values: Array(0), _id: "5e638aca2812360ef806e37e", title: "Make", icon: "fa fa-automobile", value: "as"}
        // 1: {values: Array(0), _id: "5e638aca2812360ef806e37d", title: "Condition", icon: "fa fa-automobile", value: "New"}
    


  // var Xfields = Object.keys(values);
  // this.Posts = this.OPosts.filter(_post=>{
  //   var f = _post.fields.forEach(ff => {
  //     return (ff.title).toLowerCase()==Xfields[0].toString().toLowerCase();
      
  //   });
  //   console.log(f);
    
  // })
  // this.Searchable.forEach(element=>{
  //   console.log(element);
  //   this.Posts = this.OPosts.filter(item=>{
  //     if(values.element.title!=''){
  //       return item.fields[element.title]==values[element.title];
  //     }
  //   })
    
  // })
 
}
}
