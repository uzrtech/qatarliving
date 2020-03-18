import { log } from 'util';
import { Component, OnInit } from '@angular/core';
import {ChangeDetectorRef  } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { HomeService } from 'src/app/home.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mobileQuery: MediaQueryList;
  Categories;
  User;
  NewsCategories;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private HomeService:HomeService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  } 
  ngOnInit() {
    this.HomeService.GetCategories().subscribe(Cats=>{
      this.Categories = Cats.data;
      this.NewsCategories= Cats.newsCategories;
      console.log(this.NewsCategories);
      console.log(this.Categories);
    })
    this.HomeService.GetUser().subscribe(user=>{
      this.User= user.data;
      console.log('this.User');
      console.log(this.User);
      
    })
  }

}
