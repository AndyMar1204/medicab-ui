import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OutilService } from '../outil.service';
import { AccountService } from '../services/account.service';

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
    private env: OutilService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }
  goToSignUP() {
    this.router.navigate(['inscription'])
  }
}
