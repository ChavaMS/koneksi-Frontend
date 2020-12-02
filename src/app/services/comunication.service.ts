import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Search } from '../models/search';


@Injectable()
export class ComunicationService {

    public search: Search;
    private sendObjectSearchSubject = new Subject<Search>();
    public sendObjectSearchObservable = this.sendObjectSearchSubject.asObservable();

    private imagenes = new BehaviorSubject<any>('');
    public obtenerImagenes = this.imagenes.asObservable();


    constructor() { }

    sendSearchObject(search: Search) {
        this.search = search;
        this.sendObjectSearchSubject.next(this.search);
    }

    enviarImagenes(imagenes) {
        this.imagenes.next(imagenes);
    }
}