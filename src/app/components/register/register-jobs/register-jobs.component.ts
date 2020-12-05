import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jobs } from 'src/app/models/jobs';
import { UserJobsServices } from 'src/app/services/user.jobs.service';

@Component({
  selector: 'app-register-jobs',
  templateUrl: './register-jobs.component.html',
  styleUrls: ['./register-jobs.component.css']
})
export class RegisterJobsComponent implements OnInit {

  public col1;
  public col2;
  public col3;
  public jobs;
  public ids: string[];
  public nombres: string[];


  constructor(
    private _userJobs: UserJobsServices,
    private _router: Router
  ) {
    this.ids = [];
    this.nombres = [];
    this.col1 = new Array();
    this.col2 = new Array();
    this.col3 = new Array();
  }

  ngOnInit(): void {
    localStorage.removeItem('productService');
    this.getJobs();
  }

  sendInfo() {
    localStorage.removeItem('oficios');
    localStorage.removeItem('NombreOficios');
    localStorage.setItem('oficios', JSON.stringify(this.ids));
    localStorage.setItem('NombreOficios', JSON.stringify(this.nombres));

    this._router.navigate(['register-user-jobs']);
  }

  sendToPick() {
    localStorage.setItem('productService', 'true');
    this._router.navigate(['register-election']);
  }

  goBack(){
    this._router.navigate(['register-election']);
  }

  getId(id: string, nombre: string) {
    let bandera = false;
    this.ids.forEach(element => {
      if (element == id) {
        bandera = true;
      }
    });

    if (bandera) {
      this.removeItemFromArr(this.nombres, nombre);
      this.removeItemFromArr(this.ids, id);
    } else {
      this.nombres.push(nombre);
      this.ids.push(id);
    }

  }

  removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);

    if (i !== -1) {
      arr.splice(i, 1);
    }
  }

  getJobs() {
    this._userJobs.getJobs().subscribe(response => {
      if (response) {
        this.jobs = response.response;

        let num = Math.floor(this.jobs.length / 3);
        let res = this.jobs.length % 3;

        for (let i = 0; i < (num + res); i++) {
          this.col1.push(this.jobs[i]);
        }

        for (let i = (num + res); i < (2 * num + res); i++) {
          this.col2.push(this.jobs[i]);
        }

        for (let i = (2 * num + res); i < (3 * num + res); i++) {
          this.col3.push(this.jobs[i]);
        }

      }
    }, err => {

    });
  }

}
