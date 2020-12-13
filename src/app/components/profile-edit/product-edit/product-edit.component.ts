import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProducts } from 'src/app/models/userProducts';
import { UserProductsService } from 'src/app/services/user.products.service';
import { UserServices } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public error: string;
  public formProducts: FormGroup;
  public formProductsUpdate: FormGroup;
  public numProducts: number;
  public identiy;
  public userProductsArray: UserProducts[];
  public files;
  public isActive: boolean[];

  constructor(
    private formBuilder: FormBuilder,
    private formBuilderExtra: FormBuilder,
    private _userProducts: UserProductsService,
    private _userService: UserServices
  ) {
    this.isActive = [];
    this.userProductsArray = [];
    this.files = new Array();
    this.identiy = _userService.getIdentity();
    this.numProducts = 0;
  }

  ngOnInit(): void {
    this.loadInfo();
    this.createForm();

  }

  loadInfo() {
    this._userProducts.getUserProducts(this.identiy._id).subscribe(response => {
      if (response) {
        this.userProductsArray = response.products;
        for (let i = 0; i < this.userProductsArray.length; i++) {
          this.isActive[i] = false;
          this.addForm(this.userProductsArray[i]);
        }

      }
    }, error => {

    });
  }

  createForm() {
    this.formProducts = this.formBuilder.group({
      formA: this.formBuilder.array([])
    });
  }



  get formArray(): FormArray {
    return this.formProducts.get('formA') as FormArray;
  }

  addForm(userProducts) {
    let fb = this.formBuilder.group({
      name: [userProducts.name, Validators.required],
      description: [userProducts.description, Validators.required],
      price: [userProducts.price, Validators.required],
      tags: [userProducts.tags, Validators.required]
    });
    this.formArray.push(fb);
  }

  deleteForm(id: number) {
    this._userProducts.deleteProducts(this.userProductsArray[id]._id).subscribe(response => {
      if (response) {
        console.log(response);
      }
    });
    this.formArray.removeAt(id);
  }

  activar(i) {
    this.isActive[i] = true;
  }

  updateInfo(i) {

    this._userProducts.updateUserProducts(this.userProductsArray[i]._id, this.formProducts.value.formA[i]).subscribe(response => {
      if (response) {
        console.log(response);

      }
    });
  }

  /*FORM PARA AGREGAR PRODUCTOS*/
  createFormExtra() {
    this.formProductsUpdate = this.formBuilderExtra.group({
      formB: this.formBuilderExtra.array([])
    });
  }

  addProduct() {
    if (this.numProducts == 0) {
      console.log('Si entro');
      this.createFormExtra();

    }

    this.addFormExtra();
    this.numProducts++;
  }


  addFormExtra() {
    let fb = this.formBuilderExtra.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      tags: ['', Validators.required]
    });
    this.formArrayExtra.push(fb);
  }

  get formArrayExtra(): FormArray {
    return this.formProductsUpdate.get('formB') as FormArray;
  }

  deleteFormExtra(id: number) {
    this.formArrayExtra.removeAt(id);
    this.files[id] = null;
  }

  onPhotoSelected(event: HtmlInputEvent, indice): void {
    if (event.target.files && event.target.files[0]) {
      this.files[indice] = (<File>event.target.files[0]);
    }
  }

  guardar() {
    for (let i = 0; i < this.formProductsUpdate.value.formB.length; i++) {
      this.userProductsArray[i].description = this.formProductsUpdate.value.formB[i].description;
      this.userProductsArray[i].tags = this.formProductsUpdate.value.formB[i].tags;
      this.userProductsArray[i].name = this.formProductsUpdate.value.formB[i].name;
      this.userProductsArray[i].price = this.formProductsUpdate.value.formB[i].price;
    }

    this._userProducts.saveUserProducts(this.userProductsArray, this.files, this.identiy._id).subscribe(response => {
      if (response) {
        console.log(response);
      }
    }, error => {

    });

  }

}
