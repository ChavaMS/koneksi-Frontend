import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserServices } from '../../services/user.service';
import { User } from '../../models/user';
import { UserProducts } from '../../models/userProducts';
 
@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {

  public user: User;
  public userProducts: [UserProducts];
  public isUserProducts: boolean;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserServices

  ) {
    this.isUserProducts = true;
    this.loadPage();
  }

  ngOnInit(): void {
  }

  loadPage() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
    });
  }

  getUser(id) {
    this._userService.getUserProducts(id).subscribe(
      response => {
        if (response.user && response.products) {
          this.user = response.user[0];
          this.userProducts = response.products;
        } else {
          status = 'error';
        }
      }, error => {
        console.log(<any>error);
        this._router.navigate(['/login']);
      });
  }

}
