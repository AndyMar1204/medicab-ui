import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { switchAll } from 'rxjs';
import { Hopital } from './models/hopital';
import { Account } from './models/account';
import { AccountService } from './services/account.service';

@Injectable({
  providedIn: 'root'
})
export class OutilService {
  base_url = "http://localhost:8080/"
  typeAccount = "typeAccount"
  user = "user"
  driver = "driver"
  hopital = "hopital"
  telephoneOrEmail = "telephoneOrNumber"
  password = "password"
  id = 'id'
  apiKey = 'AIzaSyCQ9_nzfMlRjohAaWOYz19nY1Ux40wdzcE';
  id_user_hopital = 'id_user_hopital'
  id_user_doctor = 'id_user_doctor'
  constructor(
    private toastController: ToastController,
    private router: Router,
    private cookiesServices: CookieService
  ) { }
  getTypeAccount() {
    let typeAcc = sessionStorage.getItem(this.typeAccount)
    switch (typeAcc) {
      case this.user:
        return this.user;
      case this.driver:
        return this.driver
      case this.hopital:
        return this.hopital
      default:
        return null;
    }
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      location.reload()
      if (event.target != null)
        event.target.complete();


    }, 2000);
  };
  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: position
    });

    await toast.present();
  }
  goToProfil() {
    this.router.navigate(['/tabs/tab3'])
  }
  goToListHospital() {
    
    this.router.navigate(['/tabs/hospitals'])
  }

  goToMyHospital() {
    let id  = sessionStorage.getItem(this.id_user_hopital)
    this.router.navigate(['/tabs/hospital/'+id])
  }
  goToHospital(hopital:Hopital){
    let id  = sessionStorage.getItem(this.id_user_hopital)
    this.router.navigate(['/tabs/hospital/'+hopital.id])
  }
  goToMyDoctor() {
    this.router.navigate(['/tabs/myDoctor'])
  }
  goToTransport() {
    this.router.navigate(['tabs/transport'])
  }
  async logOut() {
    this.cookiesServices.deleteAll()
    sessionStorage.clear()
    setTimeout(() => {
      location.reload()
    }, 1500);
  }
  goToSignup() {
    this.router.navigate(['/inscription'])
  }
  isUser(){
    if (sessionStorage.getItem(this.typeAccount) == this.user) {
       
      return true;
    }
    else return false
  }
  isHopital(){
    if (sessionStorage.getItem(this.typeAccount) == this.hopital) {
       
      return true;
    }
    else return false
  }
  isDriver(){
    if (sessionStorage.getItem(this.typeAccount) == this.driver) {
       
      return true;
    }
    else return false
  }
  userHasHopital(){
    if (sessionStorage.getItem(this.id_user_hopital)) {
      return true
    }
    return false
  }
  userHasDoctor(){
    if (sessionStorage.getItem(this.id_user_doctor)) {
      return true
    }
    return false
  }
  // loadUser(){
  //   let account =  new Account()
  //   let id_=parseInt(sessionStorage.getItem(this.id)!)
  //   this.accountService.getAccountById(id_).subscribe(
  //     dat=>{
  //       account=dat;
  //       return account;
  //     },
  //     err=>{
  //       console.log(err);
        
  //     }
  //   )
  //   return account
  // }
 
  public isOpen(val:boolean){
    if (val==true) {
      return 'Ouvert'
    }else
    return 'Fermé'
   }
   public getGroupesSanguins(){
    return ["O+","A-","A+","0-"]
   }
   public getAllCountries(){
    const pays = [
      'République Democratique du Congo','Rwanda','Republiique Centre Afriquaine','Belgique',
      'Argentine','Brezil','Cameroun','Dannemark','Italie','France','Germanie','Chine','Japon',
      'Egypte','Burundi','Angola','Tanzanie','Gabon','Guinée',"Soudan"]
      
    return pays;
   }
}

