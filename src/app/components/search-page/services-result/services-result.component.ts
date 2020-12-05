import { Component, OnInit } from '@angular/core';
import { Distance } from 'src/app/models/distance';
import { Search } from 'src/app/models/search';
import { ComunicationService } from 'src/app/services/comunication.service';
import { InteractionsService } from 'src/app/services/interactions.service';
import { SearchService } from 'src/app/services/search.service';
import { UserServices } from 'src/app/services/user.service';
import { UserServicesService } from 'src/app/services/user.services.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-services-result',
  templateUrl: './services-result.component.html',
  styleUrls: ['./services-result.component.css']
})
export class ServicesResultComponent implements OnInit {

  public url: string;
  public search: Search;
  public distance: Distance;
  public isSearch: boolean;
  public identity;
  public ratingMax;
  public userService;
  public numbers;


  constructor(
    private _userServices: UserServicesService,
    private _interactionService: InteractionsService,
    private _userService: UserServices,
    private _searchService: SearchService,
    private _comunicationService: ComunicationService
  ) {
    this.numbers = new Array();
    this.ratingMax = [1, 2, 3, 4, 5];
    this.distance = new Distance('', '', '', '');
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.getResponse();
    this.getUserServices();
  }


  //------------------SEARCH------------------------------------------
  getResponse() {
    this._comunicationService.sendObjectSearchObservable.subscribe(res => {
      if (res) {
        this.search = res;
        this.isSearch = true;

        this.getServiceSearch();

      }
    });
  }

  getServiceSearch(page = 1) {
    if (this.isSearch) {
      this._searchService.getSearchServices(this.search, page).subscribe(response => {
        console.log(response);

        if (response) {
          this.userService = response.userServiceArray;
          this.isSearch = true;

          //Arreglo que indica el total de paginas
          this.numbers = new Array();

          for (let i = 0; i < response.total; i++) {
            this.numbers[i] = (i + 1);
          }

          //Carga rating y distancias
          this.getExtraContent();

          this.scrollTop();
        }

      }, err => {

      });
    }
  }
  //------------------SEARCH------------------------------------------

  //------------------NORMAL PAGE-------------------------------------
  getUserServices(page = 1) {
    console.log('entra');

    this._userServices.getUsersService(page).subscribe(response => {
      console.log('entra');


      if (response) {
        this.userService = response.services;


        //Arreglo que indica el total de paginas
        this.numbers = new Array();
        for (let i = 0; i < response.pages; i++) {
          this.numbers[i] = (i + 1);
        }

        let scrollToTop = window.setInterval(() => {
          let pos = window.pageYOffset;
          if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
          } else {
            window.clearInterval(scrollToTop);
          }
        }, 16);

        this.getExtraContent();

        this.scrollTop();
      }
    }, err => {

    });
  }
  //------------------NORMAL PAGE-------------------------------------

  //-------------------RATING--DISTANCIA------------------------------
  getExtraContent() {
    this.userService.forEach(element => {

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
  //-------------------RATING--DISTANCIA------------------------------

  /*---------------------SCROLL TOP-----------------------------------*/
  scrollTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
