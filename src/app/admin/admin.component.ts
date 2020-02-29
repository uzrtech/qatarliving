import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  url = environment.baseUrl;
  notifications;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<{message:string, data:string}>(this.url+'/api/notifications').subscribe(res=>{
      this.notifications = res.data;
    })
  }

  ngOnDestroy(): void {
    localStorage.removeItem('role')
;    
  }
}
