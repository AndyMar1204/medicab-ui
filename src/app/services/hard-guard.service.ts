import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OutilService } from '../outil.service';

@Injectable({
  providedIn: 'root'
})
export class HardGuardService implements CanActivate {

  constructor(
    private router:Router,
    private env :OutilService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (
      sessionStorage.getItem(this.env.typeAccount)!==null 
      &&
      sessionStorage.getItem(this.env.telephoneOrEmail)!==null 
      &&
      sessionStorage.getItem(this.env.password)!==null
      ) {
      return true
    }else{
      this.router.navigate(['connexion'])
      return false
    }
  }
}
