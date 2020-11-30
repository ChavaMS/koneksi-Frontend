import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class UserServices {
    public url: string;
    public identity;
    public token;
    public stats;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    updateCoverPage(email: string, file: File): Observable<any> {
        const fd = new FormData();
        fd.append('email', email);
        fd.append('coverPage', file);



        //let params = JSON.stringify(user);
        //let headers = new HttpHeaders().set('Content-Type', 'application/json');
        //console.log(fd);
        
        return this._http.post(this.url + 'updateCoverPage', fd);
    } 

    registerUser(user: User, addres: Array<string> ,file: File): Observable<any> {
        const fd = new FormData();
        fd.append('name', user.name);
        fd.append('surname', user.surname);
        fd.append('email', user.email);
        fd.append('password', user.password);
        fd.append('country', user.country);
        fd.append('state', user.state);
        fd.append('city', user.city);
        fd.append('image', file);
        fd.append('suburb', addres[0]);
        fd.append('street', addres[1]);
        fd.append('cp', addres[2]);


        //let params = JSON.stringify(user);
        //let headers = new HttpHeaders().set('Content-Type', 'application/json');
        //console.log(fd);
        
        return this._http.post(this.url + 'saveUser', fd);
    } 

    signup(user, gettoken = null): Observable<any> {
        if (gettoken != null) {
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');

        if (token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    getUserProducts(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

        return this._http.post(this.url + 'get-products/' + id, { headers: headers });
    }

    getUserJobs(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

        return this._http.post(this.url + 'get-user-jobs/' + id, { headers: headers });
    }

}