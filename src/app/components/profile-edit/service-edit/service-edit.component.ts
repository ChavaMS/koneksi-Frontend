import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/models/userService';
import { UserServices } from 'src/app/services/user.service';
import { UserServicesService } from 'src/app/services/user.services.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {

  public formServices: FormGroup;
  public identity;

  constructor(
    private _userServiceServices: UserServicesService,
    private _userService: UserServices,
    private formBuilder: FormBuilder
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    this.loadInfo();
    this.createForm();
  }

  loadInfo(){
    this._userServiceServices.getUsersService(this.identity._id).subscribe(response => {
      console.log(response);
      
    }, error => {

     });
  }

  onFormSubmit() {

  }

  createForm() {
    this.formServices = this.formBuilder.group({
      description: ['', Validators.required],
      matutino: [''],
      vespertino: [''],
      nocturno: [''],
      tags: ['', Validators.required],
      images: this.formBuilder.array([])
    });
  }

  get imagesArray(): FormArray {
    return this.formServices.get('images') as FormArray;
  }


  addImage() {
    let fb = this.formBuilder.group({
      image: ['', Validators.required]
    });
    this.imagesArray.push(fb);
  }

  deleteImage(id: number) {
    this.imagesArray.removeAt(id);
  }


}
