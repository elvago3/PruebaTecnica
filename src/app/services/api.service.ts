import { Injectable } from '@angular/core';
import {  Login, Platforms } from '../model/interfaces.interface';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';
import { Observable, map } from 'rxjs';

import { Data } from '../model/interfaces.interface';

const URL = environment.url;
const token = localStorage.getItem('token') ?? '';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) {


  }
  login(form:Login):Observable<any>{
    let direccion = `${URL}/api/Auth`
    return this.http.post(direccion,{
      Email : form.Email,
      Password : form.Password
    });
  }


  dashboard(): Observable<Platforms>{
    let direccion = `${URL}/api/Platforms`;
    let headers = new HttpHeaders();

    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.append('authorization', token);
    }

    return this.http.get<Data>(direccion, { headers }).pipe(
      map((response: any) => {
        const data: Platforms = {
          data: response.data
        };
        return data;
      })
    );
  }


  dashboardID(id:string): Observable<Platforms>{
    let direccion = `${URL}/api/Platforms/${id}`
    return this.http.get<Data>(direccion,{
      headers : new HttpHeaders({
        'authorization': token
      })
    }).pipe(
      map((response: any) => {
        const data: Platforms = {
          data: response.data
        };
        return data;
      })
    );
  }
}
