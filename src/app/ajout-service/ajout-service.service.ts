import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjoutServiceService {
//url:string="";

  constructor(private http:HttpClient) { }

  getVoitureRdv(idrdv:string):Observable<any>{
   const token = sessionStorage.getItem('token');
   const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>("http://localhost:5000/api/rdv/admin/listVoituresRdv/"+idrdv,{headers:headers});
  }
  getService():Observable<any[]>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>("http://localhost:5000/api/service/listService",{headers:headers});
  }
  getSousService(idService:string):Observable<any>{

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any>("http://localhost:5000/api/service/listSsServbyService/"+idService,{headers:headers});
  }
  insertData(data:any):Observable<any>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>("http://localhost:5000/api/rdv/admin/ajoutDevisRdvVoiture",JSON.stringify(data),{headers:headers});
  }
}
