import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OutilService } from '../outil.service';
import { Hopital } from '../models/hopital';
import { HopitalsService } from '../services/hopitals.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-hopital',
  templateUrl: './hopital.page.html',
  styleUrls: ['./hopital.page.scss'],
})
export class HopitalPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public util:OutilService,
    public hopService:HopitalsService,
    public spinner:SpinnerService
  ) { }
  id = this.route.snapshot.params['id']
  hopital =  new  Hopital()
  ngOnInit() {
    if (sessionStorage.getItem(this.util.id)==this.id) {
      this.util.goToProfil()
      return
    }
    if (!isNaN(this.id)) {
      let id_  =  parseInt(this.id)
      this.hopService.findById(id_).subscribe(
        dat=>{
          this.hopital=dat
          this.hopService.isOpen(id_).subscribe(
            dat_=>this.hopital.isOpen=dat_
          )
        },
        err=>{
          console.log(err);
          this.util.presentToast('middle',err.error.erreur)
          setTimeout(() => {
            this.util.goToListHospital()
          }, 2000);
        }
      )
      
    }else{
      this.util.presentToast('middle','Vous n\'avez pas  encore choisi  votre hopital de  referennce')
      setTimeout(() => {
        this.util.goToListHospital()
      }, 3000);
     
    }
  }
 
}
