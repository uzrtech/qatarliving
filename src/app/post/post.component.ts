import { Component, OnInit } from '@angular/core';
import { HomeService} from '../home.service';
import { log } from 'util';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private homeService: HomeService) { }
  states = ['Arizona','California','Colorado','New York','Pennsylvania',
  ];

  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
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
      this.Categories = Cats.data;
    })
  }
  CategoryChange(index){
    if(index==0){this.Selected_Category=null;return};
    this.Selected_Category =this.Categories[index-1];
    this.SubCategories= this.Categories[index-1].cat;
    this.Selected_SubCategory= null;
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
      var fields=[];
      var data=
      {
        category:this.Selected_Category.name,
        subcategory:this.Selected_SubCategory.name,
        type:this.type,
        title:values.title,
        des:values.des,
        price:values.price,
        fields:[]
      }
      this.Selected_Category.fields.forEach(element => {
        data.fields.push({title:element.title,icon:element.icon,value:values[element.title]})
      });
     this.homeService.AddPost(data,this.fileData)
     .subscribe(val=>{this.posted=true; console.log("posted="+val);})
  }
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    if(this.fileData.size > 2000000)
    {
      console.log("Max size of 2 Mb excceded");
      this.EMessage= 'Max size of 2 Mb excceded';
      return;
    }
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
    return;
    }
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
}
}
