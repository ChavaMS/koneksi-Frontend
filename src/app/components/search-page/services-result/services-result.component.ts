import { Component, OnInit } from '@angular/core';
import { Distance } from 'src/app/models/distance';
import { InteractionsService } from 'src/app/services/interactions.service';
import { UserServices } from 'src/app/services/user.service';
import { UserServicesService } from 'src/app/services/user.services.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-services-result',
  templateUrl: './services-result.component.html',
  styleUrls: ['./services-result.component.css']
})
export class ServicesResultComponent implements OnInit {

  public userService;
  public url: string;
  public identity;
  public distance: Distance;
  public ratingMax;

  constructor(
    private _userServices: UserServicesService,
    private _interactionService: InteractionsService,
    private _userService: UserServices
  ) { 
    this.ratingMax = [1, 2, 3, 4, 5];
    this.distance = new Distance('','','','');
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.getUserServices();
  }

  getUserServices() {
    this._userServices.getUsersService().subscribe(response => {
      if (response) {
        console.log(response.result);
        
        this.userService = response.result;

        this.getExtraContent();
      }
    }, err => {

    });
  }

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


  efecto(indice: number) {
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
