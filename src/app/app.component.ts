import { Component, OnInit, DoCheck } from '@angular/core';
import { UserServices } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'koneksi-Frontend';
  public identity;
  public url: String;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserServices
  ) {
    this.url = GLOBAL.url;
    this.title = 'RED SOCIAL';
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

  perfil() {
    this.identity = this._userService.getIdentity();
    console.log("Quedé");

    switch(this.identity.type) {
      case 'userProduct': this._router.navigate(['/user-products/' + this.identity._id]);
        break;
      case 'userService': this._router.navigate(['/user-service/' + this.identity._id]);
        break;
      case 'userJob': this._router.navigate(['/user-jobs/' + this.identity._id]);
        break;
      case 'client': this._router.navigate(['/user-client/' + this.identity._id]);
        break;
    }

  }
}

