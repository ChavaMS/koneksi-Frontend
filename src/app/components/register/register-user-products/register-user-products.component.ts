import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public formProducts: FormGroup;
  public error;

  constructor(
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _comunicationService: ComunicationService
  ) {
    this.userProductsArray = [];
    this.numberProducts = 0;
    this.files = new Array();

  }

  /* ---------------------------------------------------- */
  createForm() {
    this.formProducts = this.formBuilder.group({
      formA: this.formBuilder.array([])
    });
  }

  get formArray(): FormArray {
    return this.formProducts.get('formA') as FormArray;
  }

  addForm() {
    console.log('si entra');

    let fb = this.formBuilder.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      tags: ['', Validators.required]
    });
    this.formArray.push(fb);
  }

  deleteForm(id: number) {
    this.formArray.removeAt(id);
  }
  /* ------------------------------------------------------------- */

  ngOnInit(): void {
    this.createForm();
    this.addForm();

    this.loadPage();
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  goBack() {
    localStorage.setItem('productService', 'true');
    this._router.navigate(['/register-election']);
  }


  continuar() {
    this.error = '';
    localStorage.removeItem('userProductsArray');
    localStorage.removeItem('userProductsImages');
    localStorage.removeItem('isUserProducts');

    this.generarForm(this.formProducts.value.formA.length);


    for (let i = 0; i < this.userProductsArray.length; i++) {
      this.userProductsArray[i].description = this.formProducts.value.formA[i].description;
      this.userProductsArray[i].name = this.formProducts.value.formA[i].name;
      this.userProductsArray[i].price = this.formProducts.value.formA[i].price;
      this.userProductsArray[i].tags = this.formProducts.value.formA[i].tags;

      if (this.formProducts.value.formA[i].image == '' || this.userProductsArray[i].description == '' || this.userProductsArray[i].name == '' || this.userProductsArray[i].price == '' || this.userProductsArray[i].tags == '') {
        this.error = 'Rellene todos los campos';
      }
    }
    
    if (this.error != '') {
      return;
    }

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

  onPhotoSelected(event: HtmlInputEvent, indice: number): void {
    if (event.target.files && event.target.files[0]) {
      this.files[indice] = (<File>event.target.files[0]);
    }
  }

}
