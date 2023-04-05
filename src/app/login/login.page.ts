import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Account } from '../models/account';
import { OutilService } from '../outil.service';
import { AccountService } from '../services/account.service';
import { SpinnerService } from '../services/spinner.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private cookieService: CookieService,
    public env: OutilService,
    private http: HttpClient,
    
    public spinner: SpinnerService,
  ) { }
  emailOrPhone = ""
  password = ""
  stayConnected: boolean = false;
  ngOnInit() {
    let telOrMail = this.cookieService.get(this.env.telephoneOrEmail)
    let pass = this.cookieService.get(this.env.password)
    let typ = sessionStorage.getItem(this.env.typeAccount)
    if (telOrMail && pass && typ) {
      this.signinByCookies(telOrMail, pass, typ)
    }
  }
  telOrMailFormControl = new FormControl('', [Validators.required]);
  passwordFormControl =new FormControl('', [Validators.required]);
  goToSignUP() {
    this.router.navigate(['inscription'])
  }
  connexion(adminLogin: NgForm) {
    this.emailOrPhone = this.telOrMailFormControl.value!
    this.password = this.passwordFormControl.value!
    let typeAccount = sessionStorage.getItem(this.env.typeAccount)
    if (typeAccount) {
      if (adminLogin.valid) {
        console.log(this.emailOrPhone, this.password);

        this.accountService.signin(typeAccount, this.emailOrPhone, this.password).subscribe(
          data => {
            console.log(data);
            this.accountService.saveAccountUser(data)
            if (this.stayConnected == true) {
              this.saveUserCookies(data)
            }
            if (sessionStorage.getItem(this.env.typeAccount) === this.env.user) {
              let user = data as User
              if (user.hopital) {
                sessionStorage.setItem(this.env.id_user_hopital,`${user.hopital.id}`)
              }
              
            }
            this.env.presentToast('bottom','connexion reussie')
            location.replace('')
          },
          err => {
            if (err.status === 0) {
              this.env.presentToast('bottom',"Impossible de se connecter au serveur, verifiez votre connection internet et reessayez plus tard")
            } else
            this.env.presentToast('bottom',err.error.erreur)
            console.log(err);
          }
        )
      } else {
        this.env.presentToast('bottom','Ce formulaire contient des erreurs')

        location.reload()
      }
    } else {
      this.env.presentToast('bottom','Veuillez selectionner un compte pour continuer')

      location.reload()
    }

  }

  goToReset() {
    this.router.navigate(['reset'])
  }
  saveUserCookies(account: Account) {
    let typ = sessionStorage.getItem(this.env.typeAccount)
    this.cookieService.set(this.env.telephoneOrEmail, account.email, { expires: 60, sameSite: 'Lax' })
    this.cookieService.set(this.env.password, account.password, { expires: 60, sameSite: 'Lax' })
    this.cookieService.set(this.env.typeAccount, typ!, { expires: 60, sameSite: 'Lax' })
  }
  signinByCookies(telOrEmail: string, password: string, typ: string) {
    this.accountService.signinByCookie(typ, telOrEmail, password).subscribe(
      data => {
        console.log(data);
        this.accountService.saveAccountUser(data)
        if (this.stayConnected == true) {
          this.saveUserCookies(data)
        }
        this.env.presentToast('bottom','connexion reussie')
        location.replace('')
      },
      err => {
        this.env.presentToast('bottom','echec de la connexion')
        console.log(err);
      }
    )
  }
  isCorrectForm(){
   if (this.telOrMailFormControl.valid && this.passwordFormControl.valid) {
     return true
   } else {
    return false
   }
  }
}
