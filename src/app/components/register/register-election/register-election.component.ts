import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-election',
  templateUrl: './register-election.component.html',
  styleUrls: ['./register-election.component.css']
})
export class RegisterElectionComponent implements OnInit {

  public isProductsService: string;
  constructor() { }

  ngOnInit(): void {
    this.isProductsService = 'false';
    this.getSelection();
  }

  getSelection(){
    this.isProductsService = localStorage.getItem('productService');

  }

}
