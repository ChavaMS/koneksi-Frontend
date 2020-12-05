import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../models/userService';

@Component({
  selector: 'app-user-service',
  templateUrl: './user-service.component.html',
  styleUrls: ['./user-service.component.css']
})
export class UserServiceComponent implements OnInit {

  public isUserService: boolean;
  public user: User;
  public userService: UserService;

  constructor(
    private _userService: UserServices,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.isUserService = true;
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
          this.userService = response.products;
        } else {
          status = 'error';
        }
      }, error => {
        console.log(<any>error);
        this._router.navigate(['/login']);
      });
  }

}
