import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Search } from '../models/search';


@Injectable()
export class ComunicationService {

    public search: Search;
    private sendObjectSearchSubject = new Subject<Search>();
    public sendObjectSearchObservable = this.sendObjectSearchSubject.asObservable();

    private imagenesProductos = new BehaviorSubject<any>('');
    public obtenerImagenesProductos = this.imagenesProductos.asObservable();


    private imagenesServicios = new BehaviorSubject<any>('');
    public obtenerImagenesServicios = this.imagenesServicios.asObservable();

    constructor() { }

    sendSearchObject(search: Search) {
        this.search = search;
        this.sendObjectSearchSubject.next(this.search);
    }

    enviarImagenesProductos(imagenes) {
        this.imagenesProductos.next(imagenes);
    }

    enviarImagenesServicios(imagenes){

    }


}