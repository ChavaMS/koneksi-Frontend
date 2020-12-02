import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-number-products',
  templateUrl: './register-number-products.component.html',
  styleUrls: ['./register-number-products.component.css']
})
export class RegisterNumberProductsComponent implements OnInit {


  public numberProducts: number;
  public isSelected: boolean;
  constructor(
    private _router: Router
  ) {
    this.isSelected = false;
    this.numberProducts = 0;
   }

  ngOnInit(): void {
  }

  siguiente(){
    if(this.numberProducts > 0){
      this._router.navigate(['register-user-products/', this.numberProducts]);
    }else{
      this.isSelected = true;
    }
  }

}
