import { log } from 'util';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-cat-fields',
  templateUrl: './sub-cat-fields.component.html',
  styleUrls: ['./sub-cat-fields.component.css']
})


export class SubCatFieldsComponent implements OnInit {

  Categories;
  action='add';
  S_subcategory = {fields:[]};
  cate;
  loading=false;
  edit={title:'',type:'', icon:''};
  url = environment.baseUrl;
  constructor(private Http:HttpClient) { 
  }
  ngOnInit() {
    this.Http.get<{message:string, data:string}>(this.url+'/api/categories').subscribe(res=>{
      this.Categories  = res.data;
      this.cate=this.Categories[0];
      this.S_subcategory = this.Categories[0].cat[0];
      })
  }
  selectCat(sub){
    this.S_subcategory = sub;
    console.log(sub);
  }
  saveCat(){
    this.loading=true;
      this.Http.post<{message:string, data:string}>(this.url+'/api/categories/update',this.cate).subscribe(
        res=>{console.log(res.data);this.loading=false;
        }
      )
  }

  formSumbit(){
    console.log(this.edit);
    this.S_subcategory;
    

  }
  addNew(){
    this.S_subcategory.fields.push({
      title:this.edit.title,
      type:this.edit.type,
      icon:this.edit.icon,

    });
  }
  
}
