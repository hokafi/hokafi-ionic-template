import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TestProvider Provider');
  }
  login(username,password){
    var authHeader = 'Basic ' + btoa(username + ":" + password)
    var headers = new HttpHeaders();
    let headers1 = new Headers({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    });
    headers.append("Authorization",authHeader)
    console.log(headers.keys() )
    this.http.post("http://localhost:9000/auth",{},{headers : headers}).subscribe(data =>{
      console.log(data)
    })
  }
}
