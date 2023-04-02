import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { CookieService } from 'ngx-cookie-service';
import { OutilService } from '../outil.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements CanActivate {
  
  constructor(private router:Router,
    private http:HttpClient,
    private cookieService:CookieService,
    private env :OutilService,
    ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (
      sessionStorage.getItem(this.env.typeAccount)!==null
      ) {
      return true
    }else{
      this.router.navigate(['chooseAccount'])
      return false
    }
  }
  signin(typeAccount:string,phoneOrEmail:string,password:string){
     
   let url = this.env.base_url+`rest/account/findUser/${typeAccount}/${phoneOrEmail}/${password}`
    return this.http.get<Account>(url)
  }
  signinByCookie(typeAccount:string,phoneOrEmail:string,password:string){
 
   let url = this.env.base_url+`rest/account/findUserByCookie/${typeAccount}/${phoneOrEmail}/${password}`
    return this.http.get<Account>(url)
  }
  saveAccountUser(account:Account){
    sessionStorage.setItem(this.env.telephoneOrEmail,account.number)
    sessionStorage.setItem(this.env.password, account.password)
    sessionStorage.setItem(this.env.id, `${account.id}`)
  }
  logout(){
    sessionStorage.clear();
    location.reload();
    this.cookieService.deleteAll()
  }
  getAccountById(id:number){
    return this.http.get<Account>(this.env.base_url+`rest/account/getAccountById/${id}`)
  }
  buildMessage(message:string){      

  }
  
}
