import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  Categories;
  title = 'Qatar Living';
  constructor(private homeService: HomeService) { }
  ngOnInit() {
    this.homeService.GetCategories().subscribe(Cats=>{
      this.Categories = Cats.data;
    })
  }
}
