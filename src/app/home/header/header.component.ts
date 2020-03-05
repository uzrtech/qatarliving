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
      console.log(this.Categories);
      
    })
  }

}