import { Component, OnInit } from '@angular/core';
import { HomeService} from '../home.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  EMessage="";
  posted=false;
  Categories;
  SubCategories;
  Selected_Category;
  types;
  type;
  Selected_SubCategory;
  ngOnInit() {
    this.homeService.GetCategories().subscribe(Cats=>{
      this.Categories = Cats.categories;
    })
  }
  CategoryChange(index){
    if(index==0){this.Selected_Category=null;return};
    this.Selected_Category =this.Categories[index-1];
    this.SubCategories= this.Categories[index-1].cat;
  }
  SubCategoryChange(index){
    this.Selected_SubCategory= this.Selected_Category.cat[index-1];
    this.types = this.Selected_SubCategory.sub;
  }
  TypeChange(index){
    this.type= this.types[index-1];
  }
  formSubmit(values){
    if(this.Selected_Category==null){this.EMessage="Select Category"}
    else if(this.Selected_SubCategory==null){this.EMessage="Select Sub Category"}
    else if(this.type==null){this.EMessage="Select Type"}
    else if(values.title==""){this.EMessage="Enter Title"}
    else if(values.des==""){this.EMessage="Enter Description"}
    else if(values.price==""){this.EMessage="Enter Price"}
    else{
      this.EMessage="";
      var formValues=
    {
      category:this.Selected_Category.name,
      subcategory:this.Selected_SubCategory.name,
      type:this.type
    };
    this.homeService.AddPost(Object.assign(values,formValues))
    .subscribe(val=>{this.posted=true;}
    )
    }
    
  }

}
