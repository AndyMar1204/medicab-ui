import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OutilService } from '../outil.service';
import { Driver } from '../models/driver';
import { CrudServ } from './crud-serv';
import { Observable } from 'rxjs';
import { Hopital } from '../models/hopital';

@Injectable({
  providedIn: 'root'
})
export class DriverService implements CrudServ<Driver>{

  constructor(
    private http:HttpClient,
    private env :OutilService
  ) { }
  url_signup = this.env.base_url+`rest/driver/`
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(this.url_signup+`delete/${id}`)
  }
  existById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url_signup+`checkExist/${id}`)
  }
  addNewDriver(driver:Driver){
    return this.http.post<number>(this.url_signup+`newDriver`,Driver)
  }
  findAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.url_signup+`getAll`)
  }
  findById(id: number): Observable<Driver> {
    return this.http.get<Driver>(this.url_signup+`findById/${id}`)
  }
  update(t: Driver): Observable<Driver> {
   return this.http.put<Driver>(this.url_signup+`update/${t.id}`,t)
  }
  save(t: Driver): Observable<number> {
    return this.http.post<number>(this.url_signup+`save`,t)
  }
  delete(id: number): Observable<Driver> {
    return this.http.delete<Driver>(this.url_signup+`delete/${id}`)
  }
  setDriverHopital(id_Driver:number,hopital:Hopital){
    return this.http.get<any>(this.url_signup+`setDriverHopital/${id_Driver}/${hopital.id}`)
  }
}
