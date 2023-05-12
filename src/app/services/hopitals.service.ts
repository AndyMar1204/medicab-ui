import { Injectable } from '@angular/core';
import { Hopital } from '../models/hopital';
import { CrudServ } from './crud-serv';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OutilService } from '../outil.service';

@Injectable({
  providedIn: 'root'
})
export class HopitalsService implements CrudServ<Hopital>{

  constructor(
    private http:HttpClient,
    private env :OutilService) { }
    url_signup = this.env.base_url+`rest/hospitals/`
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(this.url_signup+`delete/${id}`)
  }
  existById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url_signup+`checkExist/${id}`)
  }
  addNewHopital(hopital:Hopital){
    return this.http.post<number>(this.url_signup+`newHopital`,hopital)
  }
  findAll(): Observable<Hopital[]> {
    return this.http.get<Hopital[]>(this.url_signup+`findAll`)
  }
  findById(id: number): Observable<Hopital> {
    return this.http.get<Hopital>(this.url_signup+`findById/${id}`)
  }
  update(t: Hopital): Observable<Hopital> {
   return this.http.put<Hopital>(this.url_signup+`update/${t.id}`,t)
  }
  save(t: Hopital): Observable<number> {
    return this.http.post<number>(this.url_signup+`save`,t)
  }
  delete(id: number): Observable<Hopital> {
    return this.http.delete<Hopital>(this.url_signup+`delete/${id}`)
  }
  isOpen(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.url_signup+`isOpen/${id}`)
  }
}
