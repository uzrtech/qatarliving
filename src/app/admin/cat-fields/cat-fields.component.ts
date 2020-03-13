import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cat-fields',
  templateUrl: './cat-fields.component.html',
  styleUrls: ['./cat-fields.component.css']
})
export class CatFieldsComponent implements OnInit {

  
  url = environment.baseUrl;
  Categories;
  SCategory;
  new= false;
  action='add';
  loading=false;
  edit={title:'',type:'', icon:'',values:''};
  constructor(private Http: HttpClient) { }

  ngOnInit() {
    this.Http.get<{message:string, data:string}>(this.url+'/api/categories').subscribe(res=>{
      this.Categories  = res.data;
      console.log(this.Categories);
      
      this.SCategory= this.Categories[0];
      console.log(res.data);
      
  })
  }
   addSub(cate){ cate.push({name:'Enter Name', sub:[]}) }
  // addcat(){ this.Categories.push({name:'Enter Name', cat:[]})  }
  // saveCat(cat){
  //   this.loading= true;
  //   this.Http.post<{message:string, data:string}>(this.url+'/api/categories/update',cat).subscribe(
  //     res=>{console.log(res.data);
  //       this.loading= false;
  //     }
  //   )
  // }
  saveCat(){
    this.loading=true;
      this.Http.post<{message:string, data:string}>(this.url+'/api/categories/update',this.SCategory).subscribe(
        res=>{console.log(res.data);this.loading=false;
        }
      )
  }
  saveCats(cat){
    console.log(cat);
    this.loading= true;
    this.Http.post<{message:string, data:string}>(this.url+'/api/categories/update',cat).subscribe(
      res=>{console.log(res.data);
        this.loading= false;
      }
    )
  }
  addExtra(cate){console.log(cate);}
  addNew(){
    var newF; 
    newF = {
      title:this.edit.title,
      type:this.edit.type,
      icon:this.edit.icon};
    if(this.edit.values !=''){
      console.log('valuess');
      newF.values=this.edit.values.split(',');
    }
    console.log(newF);
    this.SCategory.fields.push(newF);
  }

  addNewCat(val){
    this.Http.post<{message:string, data:string}>(this.url+'/api/categories/add',{name:val}).subscribe(
      res=>{
        if(res.data){this.Categories.push(res.data)}
        this.loading= false;
      }
    )
  }

}
