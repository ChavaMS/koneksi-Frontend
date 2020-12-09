import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServices } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public status: string;
  public user: User;
  public identity;
  public files;
  public userGeneralInfo: UserGeneralInfo;

  constructor(
    private _userService: UserServices,
    private _router: Router
  ) {
    this.user = new User('', '', '', '', '', '', '', '', '', '', '', '', '', new Date(), new Date());
    this.userGeneralInfo = new UserGeneralInfo('', '', '', '', '');
    this.files = new Array();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.initData();
    if (!this.identity || this.identity == null || this.identity == '') {
      this._router.navigate(['login']);
    }
  }

  initData() {
    this.userGeneralInfo.name = this.identity.name;
    this.userGeneralInfo.surname = this.identity.surname;
    this.userGeneralInfo.email = this.identity.email;
    this.userGeneralInfo._id = this.identity._id;
  }

  updateUser() {
    console.log(this.files);
    if (this.files[0]) {
      this._userService.updateAvatar(this.identity.email, this.files[0]).subscribe(response => {
        if (response) {
          //PONER RESPUESTA
        }
      }, error => {

      });

    }

    if (this.files[1]) {
      this._userService.updateCoverPage(this.identity.email, this.files[1]).subscribe(response => {
        if (response) {
          //PONER RESPUESTA
        }
      }, error => {

      });

    }

    this._userService.updateUser(this.userGeneralInfo).subscribe(response => {
      if (response) {
        //PONER RESPUESTA
      }
    }, error => {

    });
  }

  onPhotoSelected(event: HtmlInputEvent, index): void {
    if (event.target.files && event.target.files[0]) {
      this.files[index] = <File>event.target.files[0];
    }
  }

}

class UserGeneralInfo {
  constructor(
    public _id: string,
    public name: string,
    public surname: string,
    public email: string,
    public password: string
  ) { }

}