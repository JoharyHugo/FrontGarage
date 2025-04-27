import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjoutPieceService {
url:string="";
  constructor(
     private http:HttpClient
  ) { }

  getServiceDataRdv(idvoiture:string,idrdv:string):Observable<any>{
     const token = sessionStorage.getItem('token');
     const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.get<any>("http://localhost:5000/api/rdv/admin/detailsDevisSousService/"+idrdv+"/"+idvoiture,{headers:headers})
  }

  getAllPiece():Observable<any>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
       'Content-Type': 'application/json'
    });
    return this.http.get<any>("http://localhost:5000/api/piece/listPiece",{headers:headers});
  }

  submitData(data:any):Observable<any>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     });
    return this.http.post<any>("http://localhost:5000/api/rdv/admin/ajoutDevisRdvPiece",JSON.stringify(data),{headers:headers});
  }
}
