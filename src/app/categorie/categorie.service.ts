import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  url:string="http://localhost:5000/api/client/";

  constructor(
    private http:HttpClient;
  ) { }
}
