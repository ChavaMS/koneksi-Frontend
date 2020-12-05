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