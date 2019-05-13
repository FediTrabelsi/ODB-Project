import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http : HttpClient) { }

  fetchData(user){
    let httpParams = new HttpParams();
    Object.keys(user).forEach(function (key) {
      httpParams = httpParams.append(key, user[key]);
    });
    return this.http.post('http://localhost:8000/odb/getData', httpParams,{
      headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
    });
}


fetchSpeed(user){
  let httpParams = new HttpParams();
  Object.keys(user).forEach(function (key) {
    httpParams = httpParams.append(key, user[key]);
  });
  return this.http.post('http://localhost:8000/odb/getSpeed', httpParams,{
    headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
  });
};

fetchOil(user){
  let httpParams = new HttpParams();
  Object.keys(user).forEach(function (key) {
    httpParams = httpParams.append(key, user[key]);
  });
  return this.http.post('http://localhost:8000/odb/getOilTemp', httpParams,{
    headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
  });
};


fetchFlow(user){
  let httpParams = new HttpParams();
  Object.keys(user).forEach(function (key) {
    httpParams = httpParams.append(key, user[key]);
  });
  return this.http.post('http://localhost:8000/odb/getFlow', httpParams,{
    headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
  });
};

fetchTime(user){
  let httpParams = new HttpParams();
  Object.keys(user).forEach(function (key) {
    httpParams = httpParams.append(key, user[key]);
  });
  return this.http.post('http://localhost:8000/odb/getTime', httpParams,{
    headers: new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded')
  });
}
}
