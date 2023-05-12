import { Injectable } from '@angular/core';
import { OutilService } from '../outil.service';
import { HttpClient } from '@angular/common/http';
import { Position } from '../models/position';
import { CrudServ } from './crud-serv';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService implements CrudServ<Position> {

  constructor(
    private http:HttpClient,
    private env :OutilService
  ) { }
  url_signup = this.env.base_url+`rest/position/`
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(this.url_signup+`delete/${id}`)
  }
  existById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url_signup+`checkExist/${id}`)
  }
  addNewPosition(position:Position){
    return this.http.post<number>(this.url_signup+`newPosition`,Position)
  }
  findAll(): Observable<Position[]> {
    return this.http.get<Position[]>(this.url_signup+`getAll`)
  }
  findById(id: number): Observable<Position> {
    return this.http.get<Position>(this.url_signup+`findById/${id}`)
  }
  update(t: Position): Observable<Position> {
   return this.http.put<Position>(this.url_signup+`update/${t.id}`,t)
  }
  save(t: Position): Observable<number> {
    return this.http.post<number>(this.url_signup+`save`,t)
  }
  delete(id: number): Observable<Position> {
    return this.http.delete<Position>(this.url_signup+`delete/${id}`)
  }
 
}
