import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserServices } from '../../services/user.service';
declare var particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserServices
  ) {
    this.user = new User('', '', '', '', '', '', '', '', '', '', '', '', '', new Date(), new Date());
  }

  ngOnInit(): void {
    //SE CARGA EL FONDO DE PARTICULAS
    particlesJS.load('particles-js', "assets/particles-json.json");
  }


  onSubmit(form) {
    //Loguear al usuario y conseguir sus datos
    this._userService.signup(this.user).subscribe(response => {
      if (response) {
        this.identity = response.user;


        if (!this.identity || !this.identity._id) {
          this.status = 'error';
        } else {
          //Persistir datos del usuario
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //Conseguir el token
          this.getToken();

          //Se manda a home
          this.status = 'success';
          //this._router.navigate(['home']);
        }
      }
    }, err => {
      if (err != null) this.status = 'error';
    });
  }


  getToken() {
    this._userService.signup(this.user, 'true').subscribe(response => {
      if (response) {
        this.token = response.token;

        if (this.token.length <= 0) {
          this.status = 'error';
        } else {
          //Persistir TOKEN del usuario
          localStorage.setItem('token', this.token);

        }
      }
    }, err => {
      if (err != null) this.status = 'error';
    });
  }


}
