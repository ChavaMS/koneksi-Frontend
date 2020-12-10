import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { InteractionsService } from 'src/app/services/interactions.service';
import { GLOBAL } from '../../../services/global';

import { UserServices } from '../../../services/user.service';


@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.css']
})
export class MainInfoComponent implements OnInit {

  @Input() user: User;
  @Input() isUserProducts: boolean;
  @Input() iUserService: boolean;
  @Input() isUserJob: boolean;

  private token: string;
  public rating;
  public ratingMax;
  public url: String;
  public rate: ObjetoRating;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor(
    private _interactionService: InteractionsService,
    private _UserService: UserServices
  ) { 
    this.token = this._UserService.getToken();
    this.url = GLOBAL.url;
    this.ratingMax = [1,2,3,4,5];
    this.rate = new ObjetoRating ("", 0);
  } 

  ngOnInit(): void {
    this.cargarRating();
  }

  cargarRating() {
    this._interactionService.getRating(this.user._id).subscribe(response => {
      
      if(response){
        this.rating = response.promedio;
        console.log('cargarRating Rating:  ' + this.rating);
        this.selectedValue = this.rating;
      }
    }, err => {
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


  subirRating(star) {
    this.selectedValue = star;

    this.rate.userSaved = this.user._id;
    this.rate.rating = star;

    this._interactionService.saveRating(this.token, this.rate).subscribe(response => {});
  }

}

export class ObjetoRating {
    constructor(
      public userSaved: string,
      public rating: number
    ){}
}
