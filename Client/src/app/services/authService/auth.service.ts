import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  signUser(user){
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function (key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post('http://localhost:8000/auth/login', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }


  registerUser(user){
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function (key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post('http://localhost:8000/auth/register', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
  }
}
