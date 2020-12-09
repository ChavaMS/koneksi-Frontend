import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../models/userService';
import { UserServicesService } from 'src/app/services/user.services.service';

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
    private _userService: UserServicesService,
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
    this._userService.getOneUserService(id).subscribe(
      response => {
        console.log(response.user[0]);
        console.log(response.services[0]);
        
        if (response.user) {
          this.user = response.user[0];
          this.userService = response.services[0];
        } else {
          status = 'error';
        }
      }, error => {
        console.log(<any>error);
        this._router.navigate(['/login']);
      });
  }

}
