import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

export class User {
  name: string;
  email: string;
  picture: String;
  constructor(name: string, email: string, picture) {
    this.name = name;
    this.email = email;
    this.picture = picture;
  }
}
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  // Change to this http://ed43bb3b.ngrok.io/api/login
  static readonly LOGIN_URL = 'http://localhost:9000/auth';
  // Change to this http://ed43bb3b.ngrok.io/api/register
  static readonly REGISTER_URL = 'http://contoh.dev/api/register';
  access: boolean;
  token: string;
  currentUser: User;

  constructor(public http: HttpClient, private storage: Storage) {

  }

  // Login
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials.");
    } else {
      this.token = btoa(credentials.email + ":" + credentials.password);
      return Observable.create(observer => {
        this.http.post(AuthServiceProvider.LOGIN_URL, credentials)
          // .map(res => res.json())
          .subscribe((data: any) => {
            var data = data.valueOf();
            if (data.token) {
              this.storage.set("token", data.token).then(_ => {
                this.storage.set("user", data.user).then(_ => {
                  this.token = 'Bearer ' + data.token;
                  this.currentUser = new User(data.user.name, data.user.email, data.user.picture)
                  this.access = true;
                  observer.next(this.access);
                })
              })

            } else {
              this.access = false;
              observer.next(this.access);
            };
          }, err => {
            observer.next(false);
          });

        // setTimeout(() => {
        //       observer.next(this.access);
        //   }, 500);
      }, err => {
        console.error(err)
        return false;
      });
    }
  }

  auth(username, password) {
    var authHeader = 'Basic ' + btoa(username + ":" + password)
    console.log(authHeader)
  }
  // Register
  public register(credentials) {
    if (credentials.name === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {

        this.http.post(AuthServiceProvider.REGISTER_URL, credentials)
          // .map(res => res.json())
          .subscribe(data => {
            console.log(data);
          });

        observer.next(true);
        observer.complete();
      });
    }
  }

  // Get Token
  public getToken() {
    return this.token;
  }

  public getUserInfo() {
    return Observable.create(observer => {
      if (this.currentUser)
        observer.next(this.currentUser);
      else {
        this.storage.get('user').then(user => {
          console.log(user)
          this.currentUser = new User(user.name, user.email, user.picture);
          observer.next(this.currentUser);
        })
        .catch(err =>  observer.next(this.currentUser));
      }
    })

  }
  // Logout
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.token = null;
      this.storage.clear().then(_ =>{
        observer.next(true);
        observer.complete();
      }).catch(_ =>{
        observer.next(true);
        observer.complete();
      })
      
    });
  }

}