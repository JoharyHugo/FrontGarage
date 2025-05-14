import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  constructor(private http:HttpClient) { }

  getRdv():Observable<any>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any>("http://localhost:5000/api/rdv/admin/listRdv/encoursdevis",{headers:headers});
  }

  validation(item:any):Observable<any>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>("http://localhost:5000/api/rdv/admin//confirmation",JSON.stringify(item),{headers:headers});
  }
}
