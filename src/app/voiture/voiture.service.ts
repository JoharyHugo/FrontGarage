import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  url:string="http://localhost:5000/api/client/";

  constructor(
    private http:HttpClient
  ) { }

  save(item:any):Observable<any>{
    const headers =new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url+"login",JSON.stringify(item),{headers:headers})
  }
}
