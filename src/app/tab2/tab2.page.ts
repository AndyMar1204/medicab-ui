import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap,  } from '@capacitor/google-maps';
import { Account } from '../models/account';
import { Position } from '../models/position';
import { User } from '../models/user';
import { OutilService } from '../outil.service';
import { AccountService } from '../services/account.service';
import { Geolocation } from '@capacitor/geolocation';
import { SpinnerService } from '../services/spinner.service';
import { PositionService } from '../services/position.service';
import { Hopital } from '../models/hopital';
import { HopitalsService } from '../services/hopitals.service';
import { log } from 'console';
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
        //console.log(success); 
        
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
    public posService: PositionService,
    public hopService: HopitalsService
  ) { }
  ngOnInit(): void {
    this.getAccount()
    this.getCurrentPosition().then(
      success => {
        this.myPosition.latitude = success.coords.latitude
        this.myPosition.longitude = success.coords.longitude
        this.addMarker(this.myPosition)
      },
      fail => {
        if (fail.code === 2) {
          this.util.presentToast('bottom', 'Veuillez autoriser l\'application à acceder à votre position')
        }
        if (fail.code === 3) {
          this.util.presentToast('bottom', 'Impossible  d\'acceder à  votre  position \n Veuillez verifiez votre connexion pour  continuer')
        }
        if (fail.code === 3) {
          this.util.presentToast('bottom', 'Veuillez autoriser l\'acces à la localisation')
        }
        console.log(fail);

      }
    )
    //let mapReff = ElementRef

  }
 private getAccount() {
    let id = parseInt(sessionStorage.getItem(this.util.id)!)
    this.acService.getAccountById(id).subscribe(
      dat => {
        this.myPosition = dat.position
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
    this.posService.update(this.myPosition).subscribe(
      rx => {
        //console.log(rx);
      },
      err => console.log(err)
    )


    return cordinates;
  }
  async addMarker(position: Position) {
    if (!!this.marker) {
      return;
    }
  
  
    let iconSize =  new google.maps.Size(50,50);
    await this.map?.addMarker({
      coordinate: {
        lat: position.latitude,
        lng: position.longitude
      },
      title: "Je suis ici",
      iconUrl: 'assets/icon/location.png',
      iconSize: iconSize,
      snippet:'Moi'  
    });
    // Handle marker click

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
        zoom: 15,

      },
    });
    this.addMarker(this.myPosition)
    this.loadHopitalsOnMap(this.map!)
  }
  loadHopitalsOnMap(map: GoogleMap) {
    let hops: Hopital[] = []
    let hop = new Hopital()
    if (this.util.isHopital()) {
      this.hopService.findById(parseInt(this.util.id)!).subscribe(
        dat => {
          hop = dat
        },
        err => {
          console.log(err);

        }
      )
    }
    this.hopService.findAll().subscribe(
     
      
      dat => {
        console.log(dat);
        dat.forEach(
          async e => {
            if (hop.id == e.id) {
              console.log();

            } else {
              let iconSize = new google.maps.Size(25,30);
              hops.push(e)
              // Add a marker to the map
              const marker = await map.addMarker({
                coordinate: {
                  lat: e.position.latitude,
                  lng: e.position.longitude
                },
                title:e.username,
                iconUrl:'assets/icon/hosp.png',
                iconSize:iconSize
              }
              );
              
            }
          }
        )
      },
      err => {
        console.log(err)
      }
    )
  }
}
