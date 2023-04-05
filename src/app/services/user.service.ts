import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { OutilService } from '../outil.service';
import { CrudServ } from './crud-serv';
import { Hopital } from '../models/hopital';

@Injectable({
  providedIn: 'root'
})
export class UserService  implements CrudServ<User> {

  constructor(
    private http:HttpClient,
    private env :OutilService) { }
    url_signup = this.env.base_url+`rest/users/`
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(this.url_signup+`delete/${id}`)
  }
  existById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url_signup+`checkExist/${id}`)
  }
  addNewUser(user:User){
    return this.http.post<number>(this.url_signup+`newUser`,user)
  }
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url_signup+`getAll`)
  }
  findById(id: number): Observable<User> {
    return this.http.get<User>(this.url_signup+`findById/${id}`)
  }
  update(t: User): Observable<User> {
   return this.http.put<User>(this.url_signup+`update/${t.id}`,t)
  }
  save(t: User): Observable<number> {
    return this.http.post<number>(this.url_signup+`save`,t)
  }
  delete(id: number): Observable<User> {
    return this.http.delete<User>(this.url_signup+`delete/${id}`)
  }
  setUserHopital(id_user:number,hopital:Hopital){
    return this.http.get<any>(this.url_signup+`setUserHopital/${id_user}/${hopital.id}`)
  }
}
