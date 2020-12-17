import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class UserJobsServices {
    public url: string;
    public identity;
    public token;
    public stats;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    getJobs(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'get-jobs', { headers: headers });
    }

    getUserJobs(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'get-user-jobs/' + id, { headers: headers });
    }

    deleteJobs(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());;

        return this._http.delete(this.url + 'delete-job/' + id, { headers: headers });
    }

    saveUserJobs(userJobs): Observable<any> {
        let params = JSON.stringify(userJobs);

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-user-jobs', params, { headers: headers });
    }

    updateUserJobs(userJobs, id): Observable<any> {
        let params = JSON.stringify(userJobs);

        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());;

        return this._http.put(this.url + 'update-user-job/' + id, params, { headers: headers });
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
}