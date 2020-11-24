import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
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

  public url: String;

  constructor() { 
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
  
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
