import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class SearchService {
    public url: string;
    public identity;
    public token;
    public stats;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    getProducts(page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        let id = 0;
        return this._http.post(this.url + 'get-products/' + id + "/" + page, { headers: headers });

    }

    getJobs(page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        let id = 0;
        return this._http.post(this.url + 'get-user-jobs/' + id + "/" + page, { headers: headers });

    }


    getSearchProducts(search, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(search);
        console.log(page);
        
        return this._http.post(this.url + 'search-products/' + page, params, { headers: headers });

    }

    
    getSearchJobs(search, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(search);
        console.log(page);
        
        return this._http.post(this.url + 'search-jobs/' + page, params, { headers: headers });

    }

}