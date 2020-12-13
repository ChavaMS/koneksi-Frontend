import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/models/userService';
import { UserServices } from 'src/app/services/user.service';
import { UserServicesService } from 'src/app/services/user.services.service';
import { runInThisContext } from 'vm';
import { GLOBAL } from '../../../services/global';


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {

  public formServices: FormGroup;
  public identity;
  public numImages;
  public imageNames;
  public url: string;
  public userService;
  public m: boolean;
  public v: boolean;
  public n: boolean;
  public seleccionoImagen: boolean;
  public files;
  public userServiceUpda: UserServiceUpdate;

  constructor(
    private _userServiceServices: UserServicesService,
    private _userService: UserServices,
    private formBuilder: FormBuilder
  ) {
    this.url = GLOBAL.url;
    this.userService = new Array();
    this.identity = this._userService.getIdentity();
    this.imageNames = new Array();
    this.seleccionoImagen = false;
    this.files = new Array();
    this.userServiceUpda = new UserServiceUpdate('', '', '');

  }

  ngOnInit(): void {


    this.loadInfo();

  }

  loadInfo() { 
    this._userServiceServices.getOneUserService(this.identity._id).subscribe(response => {
      console.log(response);
      this.numImages = response.services[0].images.length;
      this.userService = response.services[0];

      for (let i = 0; i < 3; i++) {
        if (this.userService.schedule.includes('M')) {
          this.m = true;
        } else {
          this.m = false;
        }
        if (this.userService.schedule.includes('V')) {
          this.v = true;
        } else {
          this.v = false;
        }
        if (this.userService.schedule.includes('N')) {
          this.n = true;
        } else {
          this.n = false;
        }
      }

      this.createForm();

      for (let i = 0; i < this.numImages; i++) {
        this.imageNames[i] = response.services[0].images[i];
        this.addImage();
      }
    }, error => {

    });
  }

  onFormSubmit() {
    this.userServiceUpda.description = this.formServices.value.description;
    this.userServiceUpda.tags = this.formServices.value.tags;

    let schedule = '';
    if (this.formServices.value.matutino != '') {
      schedule += 'M';
    }
    if (this.formServices.value.vespertino != '') {
      schedule += 'V';
    }
    if (this.formServices.value.nocturno != '') {
      schedule += 'N';
    }

    this.userServiceUpda.schedule = schedule;
    this._userServiceServices.updateMainInfoUserService(this.userService._id, this.userServiceUpda).subscribe(response => {
      if (response) {
        console.log(response);

      }
    }, err => {

    });

  }

  saveImages() {
    this._userServiceServices.saveImages(this.userService._id, this.files).subscribe(response => {
      if (response) {
        console.log(response);
      }
    }, err => {

    });
  }

  onPhotoSelected(event: HtmlInputEvent, indice): void {
    if (event.target.files && event.target.files[0]) {
      this.files[indice] = (<File>event.target.files[0]);
    }
  }

  createForm() {
    this.formServices = this.formBuilder.group({
      description: [this.userService.description, Validators.required],
      matutino: [this.m],
      vespertino: [this.v],
      nocturno: [this.n],
      tags: [this.userService.tags, Validators.required],
      images: this.formBuilder.array([])
    });
  }

  get imagesArray(): FormArray {
    return this.formServices.get('images') as FormArray;
  }


  addImage() {
    if (this.imagesArray.length > this.imageNames.length - 1) {
      this.seleccionoImagen = true;
    }
    let fb = this.formBuilder.group({
      image: ['', Validators.required]
    });
    this.imagesArray.push(fb);
  }

  deleteImage(id: number) {
    console.log(this.imageNames[id]);
    
    this._userServiceServices.deletePhoto(this.identity._id, this.imageNames[id]).subscribe(response => {
    }, error => {

    });

    this.imagesArray.removeAt(id);

    if (this.imagesArray.length <= this.imageNames.length) {
      this.seleccionoImagen = false;
    }
  }


}

export class UserServiceUpdate {
  constructor(
    public description,
    public tags,
    public schedule
  ) {

  }
}
