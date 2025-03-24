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
    const token = sessionStorage.getItem('token');
    //console.log(JSON.stringify(item));  // Indentation de 2 espaces pour rendre plus lisible
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url+"ajouterVoiture",JSON.stringify(item),{headers:headers})
  }
  getVoitureClient():Observable<any>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.url+"listVoiturebyclient",{headers:headers});
  }
}
