import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css']
})
export class SearchFieldsComponent implements OnInit {

  
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

  checkChange(field){
    console.log(field);
    
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


}
