import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }
  
  // get user list

  getUsers() {
    return this._http.get("/api/users")
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }


  //save user details

  saveUser(data) {
    return this._http.post("/api/users",data)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  // edit particular user based on username

  editUser(data){
    return this._http.post("/api/users/update",data)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }


  //delete a user

  deleteUser(username){
     return this._http.post("/api/users/delete",{username:username})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }


}