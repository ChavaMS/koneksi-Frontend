import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() lat : Number;
  @Input() lon : Number;

  constructor() {


   }

  ngOnInit(): void {
    console.log('cargado');
    console.log(this.lat);
    
  }

}
