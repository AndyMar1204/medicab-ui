import { Component, OnInit } from '@angular/core';
import { Hopital } from '../models/hopital';
import { HopitalsService } from '../services/hopitals.service';
import { OutilService } from '../outil.service';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.page.html',
  styleUrls: ['./hospitals.page.scss'],
})
export class HospitalsPage implements OnInit {

  constructor(
    public hospService: HopitalsService,
    public util: OutilService,
    public spinner: SpinnerService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public userService: UserService) { }
  hospitals: Hopital[] = []
  ngOnInit() {
    this.loadHospitals()
  }
  loadHospitals() {
    this.hospService.findAll().subscribe(
      dat => {

        dat.forEach(hop => {
          this.hospService.isOpen(hop.id).subscribe(
            dat_ => {
              hop.isOpen = dat_
              this.hospitals.push(hop)
            }
          )
        })
      },
      err => {
        console.log(err);
        this.util.presentToast('bottom', 'Impossile d\'acceder à la liste des hopitaux')
      },
      () => {

      }
    )
  }
  goToHopital(hop: Hopital) {
    this.router.navigate(['/tabs/hospital/' + hop.id])

  }
  public async showUserActionSheet(hopital: Hopital) {

    const actionSheet = await this.actionSheetController.create({
      header: `${hopital.username}`,
      buttons: [
        // {
        //   text: 'Effacer',
        //   role: 'destructive',
        //   icon: 'trash',
        //   handler: () => {
        //     // this.photoService.deletePicture(photo, position);
        //   }
        // }
        {
          text: 'Definir comme hopital de reference',
          role: '',
          icon: 'checkmark-done-circle-outline',
          handler: () => {
            const user_id = parseInt(sessionStorage.getItem(this.util.id)!)
            this.userService.setUserHopital(user_id, hopital).subscribe(
              dat => {
                this.util.presentToast('middle', dat.succes)
                sessionStorage.setItem(this.util.id_user_hopital, `${hopital.id}`)
                this.goToHopital(hopital)
              },
              err => {
                console.log(err)
                this.util.presentToast('middle', `${err.erreur}`)
              }

            )
          }
        }
        ,
        {
          text: 'Voir hopital',
          role: '',
          icon: 'eye-outline',
          handler: () => {
            this.goToHopital(hopital)
          }
        }
        ,
        {
          text: 'Annnuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          }
        }]
    });

    await actionSheet.present();
  }
  public async showHopitalActionSheet(hopital: Hopital) {

    const actionSheet = await this.actionSheetController.create({
      header: `${hopital.username}`,
      buttons: [
        // {
        //   text: 'Effacer',
        //   role: 'destructive',
        //   icon: 'trash',
        //   handler: () => {
        //     // this.photoService.deletePicture(photo, position);
        //   }
        // }
        {
          text: 'Voir hopital',
          role: '',
          icon: 'eye-outline',
          handler: () => {
            this.util.goToHospital(hopital)
          }
        }
        ,
        {
          text: 'Annnuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          }
        }]
    });

    await actionSheet.present();
  }
  public async showDriverActionSheet(hopital: Hopital) {

    const actionSheet = await this.actionSheetController.create({
      header: `${hopital.username}`,
      buttons: [
        {
          text: 'Livrer des echantillon',
          role: '',
          icon: 'medkit',
          handler: () => {
            // this.photoService.deletePicture(photo, position);
          }
        },
        {
          text: 'Voir hopital',
          role: '',
          icon: 'eye-outline',
          handler: () => {
            this.util.goToHospital(hopital)
          }
        }
        ,
        {
          text: 'Annnuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          }
        }]
    });

    await actionSheet.present();
  }
}
