import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Account } from '../models/account';
import { User } from '../models/user';
import { OutilService } from '../outil.service';
import { AccountService } from '../services/account.service';
import { SpinnerService } from '../services/spinner.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private cookieService: CookieService,
    private env: OutilService,
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    public utils: OutilService,
    public spinner: SpinnerService,
  ) { }
  accountForm!: FormGroup
  private phoneRegx = '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern(this.phoneRegx)])
  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(4)])
  confirmPasswordFormControl = new FormControl('', [Validators.required])
  acceptTermsFormControl = new FormControl('',Validators.required)
  phone = ""
  password = ""
  confirm = ''
  stayConnected: boolean = false;
  public account = new Account()
  public confirmPass = ''

  ngOnInit() {
    this.accountForm = new FormGroup({
      username: this.usernameFormControl,
      email: this.emailFormControl,
      phone: this.phoneFormControl,
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl
    }
    )
  }

  isSame() {
    if (this.passwordFormControl.value == this.confirmPasswordFormControl.value) {
      return true
    } else {
      return false
    }
  }
  isCorrectForm() {
    if (this.emailFormControl.valid && this.phoneFormControl.valid && this.usernameFormControl.valid && this.passwordFormControl.valid && this.confirmPasswordFormControl.valid) {
      return true
    } else
      return false
  }
  createAccount() {
    console.log(this.isCorrectForm());
    
    if (this.isSame()) {
      if(this.isCorrectForm()){
      switch (sessionStorage.getItem(this.env.typeAccount)) {
        case this.env.user:
          let user = this.account as User
          user.infos = ""
          this.userService.save(user).subscribe(
            dat => {
              console.log(dat);
              setTimeout(() => {
                //this.openSnackBar("Votre inscription a été effectué avec success", "Ok")
              }, 2000);
              this.router.navigate(['connexion'])
            },
            err => {
  
              if (err.status === 0) {
                this.utils.presentToast('bottom',"Impossible de se connecter au serveur, verifiez votre connection internet et reessayez plus tard")
              } else
              this.utils.presentToast('bottom',err.error.erreur)
                console.log(err);
            }
          )
  
          break;
  
        default:
          break;
      }
    }this.utils.presentToast('bottom','Le formulaire contient des erreurs')
    }else{
      this.utils.presentToast('bottom','Les mots de passes doivent etre identiques')
    }
   
  }

}
