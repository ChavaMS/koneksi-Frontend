import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserJobs } from 'src/app/models/userJobs';
@Component({
  selector: 'app-register-user-jobs',
  templateUrl: './register-user-jobs.component.html',
  styleUrls: ['./register-user-jobs.component.css']
})
export class RegisterUserJobsComponent implements OnInit {

  public jobs: string[];
  public names: string[];
  public userJobsArray: UserJobs[];
  public turnos: Turno[];
  public error;
  constructor(
    private _router: Router
  ) {
    this.jobs = JSON.parse(localStorage.getItem('oficios'));
    this.names = JSON.parse(localStorage.getItem('NombreOficios'));

    this.userJobsArray = [];
    this.turnos = [];

    for (let i = 0; i < this.jobs.length; i++) {
      this.userJobsArray[i] = new UserJobs('', '', '', '', '', '');
      this.turnos[i] = new Turno(false, false, false);
    }

  }

  ngOnInit(): void {
  }

  //Metodo que regresa a la pestaña anterior
  goBack() {
    localStorage.removeItem('oficios');
    localStorage.removeItem('NombreOficios');
    this._router.navigate(['register-jobs']);
  }

  //Metodo que encapsula 
  continuar(): boolean {
    this.error = '';

    for (let i = 0; i < this.userJobsArray.length; i++) {
      let horarios: string = '';

      if (this.turnos[i].matutino) {
        horarios += 'M';
      }
      if (this.turnos[i].vespertino) {
        horarios += 'V';
      }
      if (this.turnos[i].nocturno) {
        horarios += 'N';
      }

      this.userJobsArray[i].jobId = this.jobs[i];
      this.userJobsArray[i].schedule = horarios;

      if (this.userJobsArray[i].description == '' || this.userJobsArray[i].tags == '' || horarios == '') {
        this.error = 'Rellene todos los datos';
      }

    }

    if (this.error != '') {
      this.scrollTop();
      return;
    }



    localStorage.removeItem('userJobsArray');
    localStorage.removeItem('isJobs');

    localStorage.setItem('userJobsArray', JSON.stringify(this.userJobsArray));
    localStorage.setItem('isJobs', 'true');


    this._router.navigate(['register-user']);

    return false;
  }

  //Metodo que acumula el turno seleccionado por el usuario
  turno(turno: string, indice: number) {
    this.userJobsArray[indice].schedule.concat(turno);
  }

  scrollTop(): void{
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}

class Turno {
  constructor(
    public matutino: boolean,
    public vespertino: boolean,
    public nocturno: boolean
  ) { }
}
