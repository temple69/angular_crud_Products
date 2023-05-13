import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isUserAuthenticated= this.authService.getIsAuthenticated()
    if (isUserAuthenticated) {
        return true
    }
    
    return this.router.navigateByUrl('/login')
  }
}
