import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OutilService } from '../outil.service';

@Injectable({
  providedIn: 'root'
})
export class UrgencesService {

  constructor(
    private http:HttpClient,
    private env :OutilService
  ) { }

  private url = this.env.base_url

  getEmergencyList(){
    return this.http.get<string[]>(this.url+`getAllUrgences`)
  }
}
