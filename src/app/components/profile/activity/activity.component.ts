import { Component, OnInit, Input } from '@angular/core';
import { UserJobs } from 'src/app/models/userJobs';
import { UserProducts } from 'src/app/models/userProducts';
import { UserService } from 'src/app/models/userService';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input() products: [UserProducts];
  @Input() service: UserService;
  @Input() jobs: [UserJobs];

  @Input() isUserProducts: boolean;
  @Input() isUserService: boolean;
  @Input() isUserJobs: boolean;

  url: String;
  public activity: string;
  public selectAnterior: string;

  constructor() {
    //this.slide = 0;
    this.url = GLOBAL.url;

  }

  ngOnInit(): void {
    if (this.isUserProducts) {
      this.activity = 'Productos';
    
    } else if (this.isUserJobs) {
      this.activity = 'Oficios';
      this.cargarOficioInicial();

    } else if (this.isUserService) {
      this.activity = 'Servicios';
    }

  }

  ngAfterContentInit() {
  }

  //Cargar el primero oficio
  cargarOficioInicial() {
    this.selectAnterior = "0";

    window.onload = function () {
      document.getElementById("0").classList.remove('d-none');
    }
  }

  cargarOficio(option: Number) {
    document.getElementById(this.selectAnterior.toString()).classList.add('d-none');
    document.getElementById(option.toString()).classList.remove('d-none');

    this.selectAnterior = option.toString();
  }

  cambiarVista(option: string) {
    if (option == 'des') {
      document.getElementById('productsUserProfile').classList.remove('d-block');
      document.getElementById('productsUserProfile').classList.add('d-none');

      document.getElementById('descripcion').classList.remove('d-none');
      document.getElementById('descripcion').classList.add('d-block');
    }

    if (option == 'pro') {
      document.getElementById('productsUserProfile').classList.remove('d-none');
      document.getElementById('productsUserProfile').classList.add('d-block');

      document.getElementById('descripcion').classList.remove('d-block');
      document.getElementById('descripcion').classList.add('d-none');
    }

  }
}
