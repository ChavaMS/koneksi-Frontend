import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GLOBAL } from './global';
import { UserProducts } from '../models/userProducts';
import { element } from 'protractor';

@Injectable()
export class UserProductsService {
    public url: string;
    public identity;
    public token;
    public stats;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
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


    updateUserProducts(id, userProducts): Observable<any> {
        let params = JSON.stringify(userProducts);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

        return this._http.put(this.url + 'update-product/' + id, params, { headers: headers });
    }

    deleteProducts(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

        return this._http.delete(this.url + 'deleteProduct/' + id, { headers: headers });
    }

    saveUserProducts(userProducts, files, user): Observable<any> {
        const fd = new FormData();
        console.log(files);

        if (Array.isArray(userProducts)) {
            let i = 0;
            userProducts.forEach(element => {

                console.log(files[i]);

                fd.append('name', element.name);
                fd.append('description', element.description);
                fd.append('tags', element.tags);
                fd.append('price', element.price);
                fd.append('product', files[i++]);
            });
        } else {
            fd.append('name', userProducts.name);
            fd.append('description', userProducts.description);
            fd.append('tags', userProducts.tags);
            fd.append('price', userProducts.price);
            fd.append('product', files);
        }

        fd.append('id', user);

        //let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-products', fd);// { headers: headers });
    }


}