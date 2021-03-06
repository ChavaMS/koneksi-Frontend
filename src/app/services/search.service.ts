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

    getRandomJobs(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'randomUserJobs/', { headers: headers });
    }

    getRandomServices(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'randomUserServices/', { headers: headers });
    }

    getRandomProducts(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'randomUserProducts/', { headers: headers });
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

        return this._http.post(this.url + 'search-products/' + page, params, { headers: headers });

    }


    getSearchJobs(search, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(search);

        return this._http.post(this.url + 'search-jobs/' + page, params, { headers: headers });

    }

    getSearchServices(search, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(search);


        return this._http.post(this.url + 'search-services/' + page, params, { headers: headers });

    }

}