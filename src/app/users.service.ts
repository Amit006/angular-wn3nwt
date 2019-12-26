import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {

  private currentAllUserSubject: BehaviorSubject<any>;
  private currentAllUser: Observable<any>;

  httpOptions  = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      // Authorization: 'authkey',
      // userid: '1'
    })
  }
   ApiUrl = 'http://165.227.84.251:3006/users/alluser';
   apiUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { 

        this.currentAllUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('allUser')));
    this.currentAllUser = this.currentAllUserSubject.asObservable();
  }


  getAll() {
    return this.http.get<any>(this.apiUrl, this.httpOptions).pipe(map(user => {
      localStorage.setItem('allUser', JSON.stringify(user));
      this.currentAllUserSubject.next(user);
      return user;
      console.groupEnd();
    }));
  }
}