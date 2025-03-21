import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginclientService {
url:string="http://localhost:5000/api/client/";

  constructor(
    private http:HttpClient
  ) { }

  login(item:any):Observable<any>{
    const headers =new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url+"login",JSON.stringify(item),{headers:headers});
  }
  public verifToken():boolean{
    const token = sessionStorage.getItem("token");
    if (token) {
      return true;
    }else return false;
  }
}
