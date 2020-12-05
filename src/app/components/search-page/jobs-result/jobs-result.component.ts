import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { InteractionsService } from '../../../services/interactions.service';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Distance } from '../../../models/distance';
import { UserServices } from 'src/app/services/user.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { Search } from 'src/app/models/search';

@Component({
  selector: 'app-jobs-result',
  templateUrl: './jobs-result.component.html',
  styleUrls: ['./jobs-result.component.css']
})
export class JobsResultComponent implements OnInit {

  public resultJobs;
  public url: string;
  public ratingMax;
  public distance: Distance;
  private identity;
  public ordenActivado: boolean;
  public search: Search;
  public isSearch: boolean;
  public numbers;

  constructor(
    private _searchService: SearchService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _interactionService: InteractionsService,
    private _userService: UserServices,
    private _comunicationService: ComunicationService
  ) {
    this.url = GLOBAL.url;
    this.ratingMax = [1, 2, 3, 4, 5];
    this.distance = new Distance('', '', '', '');
    this.search = new Search('', '', '', '');
    this.numbers = new Array();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.getResponse();
    this.getJobs();
  }

  /*---------------------------SEARCH PAGE------------------------------------*/
  getResponse() {
    this._comunicationService.sendObjectSearchObservable.subscribe(res => {
      if (res) {
        this.search = res;
        this.isSearch = true;

        this.getJobsSearch();

      }
    });
  }

  getJobsSearch(page = 1) {
    if (this.isSearch) {
      this._searchService.getSearchJobs(this.search, page).subscribe(response => {

        if (response) {
          this.resultJobs = response.userJobsArray;
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
  /*---------------------------SEARCH PAGE------------------------------------*/

  /*--------------------------NORMAL PAGE--------------------------------------*/
  getJobs(page = 1) {
    this._searchService.getJobs(page).subscribe(response => {

      if (response) {
        this.resultJobs = response.userJobsArray;

        //Arreglo que indica el total de paginas
        this.numbers = new Array();

        for (let i = 0; i < response.total; i++) {
          this.numbers[i] = (i + 1);
        }
        //Carga el contenido faltante de los oficios
        this.getExtraContent();

        this.scrollTop();

      }

    }, err => {

    });
  }

  getExtraContent() {
    //------------------RATING------------------------------
    this.resultJobs.forEach(element => {
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


  /*--------------------------PROFILES---------------------------------*/
  profileJobs(id) {
    this._router.navigate(['user-jobs/' + id]);

  }

  /*-----------------------SCROLL TOP-------------------------------*/
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
