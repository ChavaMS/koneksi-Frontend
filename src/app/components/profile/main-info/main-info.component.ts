import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { InteractionsService } from 'src/app/services/interactions.service';
import { GLOBAL } from '../../../services/global';

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

  public rating;
  public ratingMax;
  public url: String;

  constructor(
    private _interactionService: InteractionsService
  ) { 
    this.url = GLOBAL.url;
    this.ratingMax = [1,2,3,4,5];
  } 

  ngOnInit(): void {

    this.cargarRating();
  
  }

  cargarRating(){
    this._interactionService.getRating(this.user._id).subscribe(response => {
      if(response){
        this.rating = response;
        console.log(this.rating);
        
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

}
