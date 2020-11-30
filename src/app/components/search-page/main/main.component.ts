import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from 'src/app/models/search';
import { ComunicationService } from 'src/app/services/comunication.service';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public productos: boolean;
  public servicios: boolean;
  public oficios: boolean;
  public distanciaOrden: boolean;
  public search: Search;
  private identity;

  constructor(
    private _router: Router,
    private _comunicationService: ComunicationService,
    private _UserServices: UserServices
  ) {
    this.search = new Search('', '', '', '');
    this.identity = _UserServices.getIdentity();
  }

  ngOnInit(): void {


  }


  busqueda(form) {
    if (!(this.search.state != '' || this.search.country != '' || this.search.city != '')) {
      this.search.country = this.identity.country;
      this.search.state = this.identity.state;
      this.search.city = this.identity.city;
    }
    console.log(this.search);
    
    this._comunicationService.sendSearchObject(this.search);


  }


  activo(num) {

    switch (num) {
      case 1:
        this.productos = false;
        this.servicios = false;
        this.oficios = true;
        break;
      case 2:
        this.oficios = false;
        this.servicios = false;
        this.productos = true;
        break;
      case 3:
        this.oficios = false;
        this.productos = false;
        this.servicios = true;
        break;
    }


  }
}
