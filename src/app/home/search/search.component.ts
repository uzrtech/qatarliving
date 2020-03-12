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
  this.Posts = this.OPosts;
  var XKeys = Object.keys(values);
  var Xvalues = Object.values(values);

  for (let i = 0; i < XKeys.length; i++) {
  if(Xvalues[i]==''){console.log('value skipped for '+ XKeys[i]); continue;}    
  this.Posts = this.OPosts.filter(_post=>{
    var f = _post.fields.find(field=>{
      return field.title==XKeys[i];
    })
    if(f.value.toLowerCase()==Xvalues[i].toString().toLowerCase()){
      console.log(f);
      return true;
    }
  })
    
  }
  
  // this.Searchable.forEach(element=>{
  //   console.log(element);
  //   this.Posts = this.OPosts.filter(item=>{
      
  //   })
    
  // })
 
}
}
