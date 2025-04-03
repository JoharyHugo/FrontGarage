import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListeService {
url:string="http://localhost:5000/api/rdv/admin/listRdvDate";

constructor(
    private http:HttpClient
  ) { }

  getRdv(daty:string):Observable<any>{
    const token = sessionStorage.getItem('token');
    //console.log(JSON.stringify(item));  // Indentation de 2 espaces pour rendre plus lisible
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    if (daty==="") {
      return this.http.get<any[]>(this.url,{headers:headers});
    }else{
      return this.http.get<any[]>(this.url+"/"+daty,{headers:headers});
    }
  }
  refusrdv(idrdv:string):Observable<any>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const data={rdvId:idrdv};
    return this.http.put<any>("http://localhost:5000/api/rdv/absence",JSON.stringify(data),{headers:headers});
  }
  presencerdv(idrdv:string):Observable<any>{
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const data={rdvId:idrdv};
    return this.http.put<any>("http://localhost:5000/api/rdv/presence",JSON.stringify(data),{headers:headers});
  }
}

