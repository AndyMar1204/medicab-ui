import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { switchAll } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutilService {
  base_url= "http://localhost:5000/"
  typeAccount= "typeAccount"
  user="user"
  driver="driver"
  hopital="hopital"
  telephoneOrEmail="telephoneOrNumber"
  password="password"
  id='id'
  apiKey = 'AIzaSyB6YiXTPsx0Eb2Ez4iLbmPi4XFOkHS_XKU';
  constructor(private toastController: ToastController) { }
  getTypeAccount(){
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
  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      if (event.target!=null) 
        event.target.complete();
      
     
    }, 2000);
  };
  async presentToast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}
