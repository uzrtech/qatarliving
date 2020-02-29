import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from './auth.service';
import { Router} from '@angular/router';
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService, private router:Router){}
  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const expectedRole = route.data.expectedRole;

    if(expectedRole=='admin'){
      var role= localStorage.getItem('role');
      if(expectedRole==role){
        return true;
      }
      this.router.navigate(['/auth/admin']);
      return false;
    }
    var token = localStorage.getItem('token');
    if(token){ return true};
    this.router.navigate(['/auth']);
    return false;}
}
