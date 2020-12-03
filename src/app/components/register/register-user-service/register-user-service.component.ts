import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/models/userService';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-register-user-service',
  templateUrl: './register-user-service.component.html',
  styleUrls: ['./register-user-service.component.css']
})
export class RegisterUserServiceComponent implements OnInit {

  public formServices: FormGroup;
  public userService: UserService;
  public error: string;

  constructor(
    private formBuilder: FormBuilder,
    private _comunicationService: ComunicationService,
    private _router: Router
  ) {
    this.error = ''
    this.userService = new UserService('', '', [''], '', '','');
  }

  ngOnInit(): void {
    this.createForm();
    this.addImage();
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

  onFormSubmit() {
    console.log(this.formServices.value);

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

    if (schedule == '') {
      this.error = 'Seleccione por lo menos un horario';
    }
    if (this.formServices.value.description == '') {
      this.error += '\n';
      this.error += 'Coloque una descripción';
    }
    if (this.formServices.value.tags == '') {
      this.error += '\n';
      this.error += 'Coloque por lo menos un tag';
    }

    if (this.error != '') {
      return;
    }

    this.userService.schedule = schedule;
    this.userService.description = this.formServices.value.description;
    this.userService.tags = this.formServices.value.tags

    localStorage.removeItem('userService')
    localStorage.removeItem('isUserService')

    localStorage.setItem('isUserService','true')
    localStorage.setItem('userService', JSON.stringify(this.userService));


    this._comunicationService.enviarImagenesServicios(this.formServices.value.iamges);
    this._router.navigate(['register-user']);

  }

}
