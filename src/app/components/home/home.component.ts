import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserServices } from '../../services/user.service';
import { SearchService } from '../../services/search.service';
import { User } from '../../models/user';
import { UserProducts } from '../../models/userProducts';
import { UserJobs } from '../../models/userJobs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listaJobs;
  public listaProducts;
  public listaServices;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserServices,
    private _searchService: SearchService,
    private _router: Router
  ) { 
    this.listaJobs = [];
    this.listaProducts = [];
    this.listaServices = [];
   }

  ngOnInit(): void {
    console.log('Pagina inicial cargada');
    this.getJobs();
    //this.getProducts();
    //this.getServices();
  }

  getJobs(){
    this._searchService.getRandomJobs().subscribe(response => {
      console.log(response.valor);
      console.log(this.listaJobs);
      this.listaJobs = response.valor;
    }, err => {

    });
  }

  getProducts(){
    this._searchService.getRandomServices().subscribe(response => {
      console.log(response);
      this.listaProducts = response.valor;
    }, err => {

    });
  }

  getServices(){
    this._searchService.getRandomProducts().subscribe(response => {
      console.log(response);
      this.listaServices = response.valor;
    }, err => {

    });
  }

}
