import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserJobs } from 'src/app/models/userJobs';
import { UserProducts } from 'src/app/models/userProducts';
import { ComunicationService } from 'src/app/services/comunication.service';
import { UserJobsServices } from 'src/app/services/user.jobs.service';
import { UserProductsService } from 'src/app/services/user.products.service';
import { UserServices } from 'src/app/services/user.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  public user: User;
  public files;
  public suburb: string;
  public postalCode: string;
  public street: string;
  public passwordComp: string;
  public emailComp: string;
  public status: string;
  public isJobs: string;
  public userJobsArray: UserJobs[];
  public isUserProducts: string;
  public userProductsArray: UserProducts[];

  constructor(
    private _userService: UserServices,
    private _userJobsService: UserJobsServices,
    private _router: Router,
    private _userProductsService: UserProductsService,
    private _comunicationService: ComunicationService
  ) {
    this.userProductsArray = JSON.parse(localStorage.getItem('userProductsArray'));
    this.isUserProducts = JSON.parse(localStorage.getItem('isUserProducts'));

    this.isJobs = localStorage.getItem('isJobs');
    this.userJobsArray = JSON.parse(localStorage.getItem('userJobsArray'));

    this.files = new Array();
    this.user = new User('', '', '', '', '', '', '', '', '', '', '', '', '', new Date(), new Date());
  }

  ngOnInit(): void {

  }
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  createUser(): boolean {
    if (!(this.user.email != this.emailComp) || !(this.user.password != this.passwordComp)) {
      console.log(this.files.length);

      if (this.files.length == 2) {
        let address = new Array();
        address[0] = this.suburb;
        address[1] = this.street;
        address[2] = this.postalCode;
        this._userService.registerUser(this.user, address, this.files[0]).subscribe(response => {
          if (response) {
            var userId = response.user._id;
            console.log(response);

            this._userService.updateCoverPage(this.user.email, this.files[1]).subscribe(response => {
              if (response) {


                //----------------OFICIOS------------------------------
                if (this.isJobs && this.isJobs == 'true') {
                  this.userJobsArray.forEach(element => {
                    element.user = userId;
                  });

                  this._userJobsService.saveUserJobs(this.userJobsArray).subscribe(response => {
                    if (response) {
                      localStorage.removeItem('userJobsArray');
                      localStorage.removeItem('isJobs');
                      localStorage.removeItem('oficios');
                      localStorage.removeItem('NombreOficios');

                      this._router.navigate(['login']);
                    }
                  }, err => {

                  });

                }
                //-----------------------------------------------------


                if (this.isUserProducts) {

                  this._comunicationService.obtenerImagenes.subscribe(response => {
                    if (response) {
                      this.files = response;
                    }

                  });

                  this._userProductsService.saveUserProducts(this.userProductsArray, this.files, userId).subscribe(response => {
                    if (response) {
                      this._router.navigate(['login']);
                    }
                  }, err => {
                    if (err) {
                      
                    }
                  });

                  localStorage.removeItem('userProductsArray');
                  localStorage.removeItem('userProductsImages');
                  localStorage.removeItem('isUserProducts');
                }


              }
            }, err => {
              console.log(err);
              this.status = "Error al subir las imaganes, recargue la pagina e intente de nuevo.";

            });
          }

        }, err => {
          if (err)
            this.status = "Ha ocurrido un error, puede que el usuario ya se haya registrado.";

        })
      } else {
        this.status = "Ingrese todo los archivos.";
      }

    } else {
      this.status = "Verifique el correo o la contraseña.";
    }

    if (this.status != null) {
      let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    }

    return false;
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.files.push(<File>event.target.files[0]);
    }
  }

}
