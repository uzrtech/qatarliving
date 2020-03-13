import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from './auth.service';
import { Router} from '@angular/router';
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService, private router:Router){}
  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
    var token = localStorage.getItem('token');
    const expectedRole = route.data.expectedRole;
    var role= localStorage.getItem('role');

    if(token && expectedRole== role){
      return true;
    }
    else{
      this.router.navigate(['/auth']);
    return false;}
    }
}
