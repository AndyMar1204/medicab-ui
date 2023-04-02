import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OutilService } from '../outil.service';

@Component({
  selector: 'app-choose-account',
  templateUrl: './choose-account.page.html',
  styleUrls: ['./choose-account.page.scss'],
})
export class ChooseAccountPage implements OnInit {

  constructor(
    private router: Router,
    private cookieService:CookieService, 
    public env :OutilService
  ) { }


  ngOnInit(): void {
    let telOrMail = this.cookieService.get(this.env.telephoneOrEmail)
    let pass = this.cookieService.get(this.env.password)
    let typ = this.cookieService.get(this.env.typeAccount)
    if(telOrMail && pass && typ){
      sessionStorage.setItem(this.env.typeAccount,typ)
      this.goToSignin()
    }
  }
  goToSignUp() {
    this.router.navigate(['/inscription'])
  }
  goToSignin() {
    this.router.navigate(['/connexion'])
  }
  isTypeAccountSet(){
    if (
      sessionStorage.getItem(this.env.typeAccount) ===null
    ) {
      return false;
    } else {
      return true;
    }
  }
  continueAs(typeAccount: string) {
    switch (typeAccount) {
      case this.env.user:
        sessionStorage.setItem(this.env.typeAccount, this.env.user)
        this.router.navigate(['connexion'])
        break;
      case this.env.hopital:
        sessionStorage.setItem(this.env.typeAccount, this.env.hopital)
        this.router.navigate(['connexion'])
        break;
      case this.env.driver:
        sessionStorage.setItem(this.env.typeAccount, this.env.driver)
        this.router.navigate(['connexion'])
        break;
      default:
        alert("Compte invalide")
        break;
    }
  }

}
