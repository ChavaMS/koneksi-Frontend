import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class InteractionsService {
    public url: string;
    public identity;
    public token;
    public stats;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    addComment(token, comment): Observable<any> {
        let params = JSON.stringify(comment);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this._http.post(this.url + 'comment', params, { headers: headers });

    }

    getComments(comment, page = 1): Observable<any> {
        let params = JSON.stringify(comment);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'getComment/' + page, params, { headers: headers });
    }

    getRating(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'getRating/' + id, { headers: headers });
    }

    getDistance(distance): Observable<any> {
        let params = JSON.stringify(distance);

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'getDistance',params, { headers: headers });
    }
    
}