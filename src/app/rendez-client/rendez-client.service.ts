import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RendezClientService {
url:string="http://localhost:5000/api/rdv/";

  constructor(
    private http:HttpClient
  ) { }

  getBlock(daty:string):Observable<any[]>{
     const token = sessionStorage.getItem('token');
        //console.log(JSON.stringify(item));  // Indentation de 2 espaces pour rendre plus lisible
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return this.http.get<any[]>(this.url+"listBlocDispo/"+daty,{headers:headers});
  }
  insertrdv(item:any):Observable<any>{
    const token = sessionStorage.getItem('token');
    //console.log(JSON.stringify(item)); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url+"/ajouterRdv",JSON.stringify(item),{headers:headers});
  }
}
