import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Account } from '../models/account';
import { Position } from '../models/position';
import { User } from '../models/user';
import { OutilService } from '../outil.service';
import { AccountService } from '../services/account.service';
import { parseTemplate } from '@angular/compiler';
import { Geolocation } from '@capacitor/geolocation';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { Marker } from '@capacitor/google-maps/dist/typings/definitions';
import { SpinnerService } from '../services/spinner.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  account = new Account()
  user = new User()
  myPosition = new Position()
  marker!: string

  @ViewChild('map') mapRef: ElementRef | undefined

  map: GoogleMap | undefined;

  ionViewDidEnter() {

    this.getCurrentPosition().then(
      success => {
        this.createMap()
        this.addMarker(this.myPosition)
        console.log(success); 

      },
      fail => {
        console.log(fail);

      }
    )
  }

  constructor(
    public util: OutilService,
    private acService: AccountService,
    public spinner: SpinnerService,
  ) { }
  ngOnInit(): void {
    this.getAccount()
    this.getCurrentPosition().then(
      success => {
        this.myPosition.latitude=success.coords.latitude
        this.myPosition.longitude=success.coords.longitude
        this.addMarker(this.myPosition)
      },
      fail => {
        if (fail.code===2) {
          this.util.presentToast('bottom','Veuillez autoriser l\'application à acceder à votre position')
        }
        if (fail.code===3) {
          this.util.presentToast('bottom','Impossible  d\'acceder à  votre  position \n Veuillez verifiez votre connexion pour  continuer')
        }
        if (fail.code===3) {
          this.util.presentToast('bottom','Veuillez autoriser l\'acces à la localisation')
        }
        console.log(fail);

      }
    )
    //let mapReff = ElementRef

  }
  getAccount() {
    let id = parseInt(sessionStorage.getItem(this.util.id)!)
    this.acService.getAccountById(id).subscribe(
      dat => {
        switch (sessionStorage.getItem(this.util.typeAccount)) {
          case this.util.user:

            this.user = dat as User
            break;

          default:
            console.log("type de compte introuvable");

            console.log(dat);
            break;
        }
      },
      err => {
        console.log(err);

      }
    )
  }

  async getCurrentPosition() {
    
    const cordinates = await Geolocation.getCurrentPosition()
    this.myPosition.latitude = cordinates.coords.latitude
    this.myPosition.longitude = cordinates.coords.longitude
   
    

    return cordinates;
  }
  async addMarker(position: Position) {
    if (!!this.marker) {
      return;
    }
    await this.map?.addMarker({
      coordinate: {
        lat: position.latitude,
        lng: position.longitude
      },
      title: "Je suis ici"
    });

  }



  async createMap() {

    this.map = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef?.nativeElement,
      apiKey: this.util.apiKey,

      config: {
        center: {
          lat: this.myPosition.latitude,
          lng: this.myPosition.longitude,
        },
        zoom: 14,

      },
    });
    this.addMarker(this.myPosition)
  }
}
