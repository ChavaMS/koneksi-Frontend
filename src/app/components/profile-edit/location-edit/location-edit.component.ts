import { Component, OnInit } from '@angular/core';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  public status: string;
  public suburb: string;
  public street: string;
  public postalCode: string;
  public identity;
  public userLocationInfo: UserLocationInfo;
  public message: string;

  constructor(
    private _userService: UserServices
  ) {
    this.userLocationInfo = new UserLocationInfo('', '', '', '', 0, 0, '', '', '');
    this.identity = _userService.getIdentity();
  }

  ngOnInit(): void {
    this.initData();
  }

  //Asigna los valores del usuario para cargar el mapa
  initData() {
    this.userLocationInfo.country = this.identity.country;
    this.userLocationInfo.state = this.identity.state;
    this.userLocationInfo.city = this.identity.city;
    this.userLocationInfo.lat = this.identity.lat;
    this.userLocationInfo.lon = this.identity.lon;
    this.userLocationInfo._id = this.identity._id;
  }

  //Método que actualiza los datos de ubicacion del usuario
  updateUserLocation() {
    this._userService.updateLocation(this.userLocationInfo).subscribe(response => {
      if (response) {
        this.message = "Inicia sesión de nuevo para ver los cambios";
        console.log(response);
      }
    }, err => {

    });
  }

}

class UserLocationInfo {
  constructor(
    public _id: string,
    public country: string,
    public state: string,
    public city: string,
    public lat: number,
    public lon: number,
    public suburb: string,
    public street: string,
    public cp: string
  ) { }

}


