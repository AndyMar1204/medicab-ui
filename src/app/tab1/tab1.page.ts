import { Component, OnInit } from '@angular/core';
import { UrgencesService } from '../services/urgences.service';
import { OutilService } from '../outil.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements  OnInit{

  listUrgences:string[] =[]
  constructor(
    private uServ:UrgencesService,
    public  util:OutilService,
    public spinner: SpinnerService) {}
  ngOnInit(): void {
    "andy"
    this.uServ.getEmergencyList().subscribe(
      dat=>{
        this.listUrgences = dat
      },
      err=>{
        console.log(err);
        this.util.presentToast('bottom','Echec de la connexion au serveur')
      }
    )
  }

}
