import { Observable } from "rxjs"

export interface CrudServ <T> {
  save(t:T):Observable<number>
  findById(id:number):Observable<T>
  deleteById(id:number):Observable<void>
  findAll():Observable<T[]>
  existById(id:number):Observable<boolean>
  update(t:T):Observable<T>
}
