import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GLOBAL } from './global';
import { UserProducts } from '../models/userProducts';
import { element } from 'protractor';
import { UserService } from '../models/userService';

@Injectable()
export class UserServicesService {
    public url: string;
    public identity;
    public token;
    public stats;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }


    saveUserService(userService: UserService, files, user): Observable<any> {
        const fd = new FormData();
        console.log(files);

        if (Array.isArray(files)) {
            let i = 0;
            files.forEach(element => {
                fd.append('services', files[i++]);
            });
        } else {
            fd.append('services', files);
        }

        fd.append('description', userService.description);
        fd.append('tags', userService.tags);
        fd.append('schedule', userService.schedule);
        fd.append('id', user);

        //let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'saveUserServices', fd);// { headers: headers });
    }


}