import { Component, OnInit } from '@angular/core';
import { OutilService } from '../outil.service';
import { Account } from '../models/account';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { SpinnerService } from '../services/spinner.service';
import { Hopital } from '../models/hopital';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  id = parseInt(sessionStorage.getItem(this.util.id)!)
  account = new Account()
  user = new User()
  hopital = new Hopital()
  driver = new Driver()
  typeAccount = this.util.getTypeAccount()
  constructor(
    public util: OutilService,
    private accountServ: AccountService,
    public spinner: SpinnerService
  ) {
    accountServ.getAccountById(this.id).subscribe(
      dat => this.account = dat
    )
  }
  ngOnInit(): void {
    this.accountServ.getAccountById(this.id).subscribe(
      dat => {
        this.account = dat as Account
        switch (this.typeAccount) {
          case this.util.user:
            this.user = dat as User

            break;
          case this.util.driver:
            this.driver = dat as Driver

            break;
          case this.util.hopital:
            this.hopital = dat as Hopital

            break;
          default:
            console.log('Type de compte introuvable');

            break;
        }
      },
      err => {
        console.log(err);

      }
    )
  }
}


