import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProducts } from 'src/app/models/userProducts';
import { ComunicationService } from 'src/app/services/comunication.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-register-user-products',
  templateUrl: './register-user-products.component.html',
  styleUrls: ['./register-user-products.component.css']
})
export class RegisterUserProductsComponent implements OnInit {

  public numberProducts: number;
  public userProductsArray: UserProducts[]
  public files;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _comunicationService: ComunicationService
  ) {
    this.userProductsArray = [];
    this.numberProducts = 0;
    this.files = new Array(); 

  } 

  ngOnInit(): void {
    this.loadPage();
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  continuar() {
    localStorage.removeItem('userProductsArray');
    localStorage.removeItem('userProductsImages');
    localStorage.removeItem('isUserProducts');

    localStorage.setItem('userProductsArray', JSON.stringify(this.userProductsArray));
    localStorage.setItem('isUserProducts', 'true');

    this._comunicationService.enviarImagenesProductos(this.files);
    this._router.navigate(['/register-user']);
  }

  loadPage() {
    this._route.params.subscribe(params => {
      let number = params['number'];
      this.generarForm(number);
    });
  }

  generarForm(number: number) {
    for (let i = 0; i < number; i++) {
      this.userProductsArray[i] = new UserProducts('', '', '', '', '', '', '', '');
    }
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.files.push(<File>event.target.files[0]);
    }
  }

}
