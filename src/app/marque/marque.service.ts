import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  url:string="http://localhost:5000/api/client/";

  constructor(
    private http:HttpClient
  ) { }

  getAllMarque():Observable<any>{
    const headers=new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.url+"listMarque",{headers : headers});
  }
}
