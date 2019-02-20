import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  public login( user:User ):Observable<any> {
    return  this.http.post (`${environment.url}/user/login`, user, {observe:'body'}).pipe();
  }

  getIndentity() {
    if ( localStorage.getItem ('identity')) {
      return JSON.parse ( localStorage.getItem ('identity') );
    }

    return null;
  }

  getToken() {

    if ( localStorage.getItem ('token') )  {
      return localStorage.getItem ('token');
    }
    return null;
  }






}
