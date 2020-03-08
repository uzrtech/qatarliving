import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AdminService } from './../admin.service';
import {  OnInit, Component,  } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  url = environment.baseUrl;
  Categories;
  new= false;
  loading=false;
  constructor(private Http: HttpClient) { }

  ngOnInit() {
    this.Http.get<{message:string, data:string}>(this.url+'/api/categories').subscribe(res=>{
      this.Categories  = res.data;
      console.log(res.data);
      
  })
  }

   addSub(cate){ cate.push({name:'Enter Name', sub:[]}) }
  // addcat(){ this.Categories.push({name:'Enter Name', cat:[]})  }
  saveCat(cat){
    this.loading= true;
    this.Http.post<{message:string, data:string}>(this.url+'/api/categories/update',cat).subscribe(
      res=>{console.log(res.data);
        this.loading= false;
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
  addField(cat,val){
    console.log(val);
    if(val.values){val.values=val.values.split(',')}
    cat.fields.push(val); console.log(cat);
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

