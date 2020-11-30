import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Search } from '../models/search';


@Injectable()
export class ComunicationService {

    public search: Search;
    private sendObjectSearchSubject = new Subject<Search>();
    public sendObjectSearchObservable = this.sendObjectSearchSubject.asObservable(); 

    constructor() {}

    sendSearchObject( search: Search ){
        this.search = search;
        this.sendObjectSearchSubject.next(this.search);
    }
}