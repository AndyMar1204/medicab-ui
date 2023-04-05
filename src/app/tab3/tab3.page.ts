import { Component, OnInit } from '@angular/core';
import { OutilService } from '../outil.service';
import { Account } from '../models/account';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  id = parseInt(sessionStorage.getItem(this.util.id)!)
  account=new Account()
  user=new User()
  typeAccount=this.util.getTypeAccount()
  constructor(
    public util:OutilService,
    private accountServ:AccountService,
    public spinner:SpinnerService
  ) {}
  ngOnInit(): void {
    if (this.id) {
      this.accountServ.getAccountById(this.id).subscribe(
        dat=>{
          this.account=dat as Account
         switch (this.typeAccount) {
            case this.util.user:
              this.user = dat as User
             
              break;
          
            default:
              break;
          }
        },
        err=>{
          console.log(err);
          
        }
      )
    }else{
      console.log("id utilisateur non valide");
      
    }
  }

}
