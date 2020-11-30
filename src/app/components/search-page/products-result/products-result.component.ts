import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InteractionsService } from 'src/app/services/interactions.service';
import { UserServices } from 'src/app/services/user.service';
import { Distance } from 'src/app/models/distance';
import { ComunicationService } from 'src/app/services/comunication.service';
import { Search } from 'src/app/models/search';


@Component({
  selector: 'app-products-result',
  templateUrl: './products-result.component.html',
  styleUrls: ['./products-result.component.css']
})
export class ProductsResultComponent implements OnInit {


  public url: string;
  public distance: Distance;
  public search: Search;
  public ordenActivado: boolean;
  public isSearch: boolean;
  public resultProducts;
  public ratingMax;
  public numbers;
  
  private identity;


  constructor(
    private _searchService: SearchService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _interactionService: InteractionsService,
    private _userService: UserServices,
    private _comunicationService: ComunicationService
  ) {
    this.identity = this._userService.getIdentity();
    this.distance = new Distance('', '', '', '');
    this.url = GLOBAL.url;
    this.ratingMax = [1, 2, 3, 4, 5];
    this.search = new Search('', '', '', '');
    this.numbers = new Array();
  }

  ngOnInit(): void {
    this.getResponse();
    this.getProducts();
  }

  getResponse() {
    this._comunicationService.sendObjectSearchObservable.subscribe(res => {
      if (res) {
        this.search = res;
        this.isSearch = true;

        this.getProductsSearch();

      }
    });
  }

  getProductsSearch(page = 1) {
    if (this.isSearch) {
      this._searchService.getSearchProducts(this.search, page).subscribe(response => {

        if (response) {
          this.resultProducts = response.userProductsArray;
          this.isSearch = true;

          console.log(this.resultProducts);
          
          //Arreglo que indica el total de paginas
          this.numbers = new Array();

          for (let i = 0; i < response.total; i++) {
            this.numbers[i] = (i + 1);
          }
          //Carga rating y distancias
          this.getExtraContent();
        }

      }, err => {

      });
    }
  }

  getProducts(page = 1) {
    this._searchService.getProducts(page).subscribe(response => {

      if (response) {
        this.isSearch = false;

        //Arreglo que indica el total de paginas
        this.numbers = new Array();
        for (let i = 0; i < response.total; i++) {
          this.numbers[i] = (i + 1);
        }
        this.resultProducts = response.userProductsArray;

        //Carga rating y distancias
        this.getExtraContent();

      }

    }, err => {

    });
  }

  getExtraContent() {
    this.resultProducts.forEach(element => {

      //----------------RATING------------------------------
      this._interactionService.getRating(element.user._id).subscribe(response => {
        if (response) {
          element.user.rating = response;
        }
      }, err => {

      });


      //----------------DISTANCIA------------------------------
      if (this.identity) {
        this.distance.latFrom = this.identity.lat;
        this.distance.lonFrom = this.identity.lon;
        this.distance.latTo = element.user.lat;
        this.distance.lonTo = element.user.lon;
        this._interactionService.getDistance(this.distance).subscribe(response => {
          if (response) {
            element.user.distanceText = response.distanceText;
            element.user.distanceValue = response.distanceValue;
          }
        }, err => {

        });
      } else {
        element.user.distanceText = 'Inicie sesión o rellene el campo de busqueda.';
      }
    });
  }

  profileProducts(id) {
    this._router.navigate(['user-products/' + id]);
  }

  efecto(indice: number) {
    console.log('si entrs');

    var rating = new Array();
    rating[0] = document.getElementById("e1");
    rating[1] = document.getElementById("e2");
    rating[2] = document.getElementById("e3");
    rating[3] = document.getElementById("e4");
    rating[4] = document.getElementById("e5");

    for (let i = 0; i < 5; i++) {
      rating[i].classList.remove('fas');
      rating[i].classList.add('far');
    }
    for (let i = 0; i <= indice; i++) {
      rating[i].classList.remove('far');
      rating[i].classList.add('fas');
    }


  }

}
