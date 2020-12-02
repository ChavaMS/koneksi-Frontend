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

  continuar(): boolean {

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
    }

    localStorage.removeItem('userJobsArray');
    localStorage.removeItem('isJobs');

    localStorage.setItem('userJobsArray', JSON.stringify(this.userJobsArray));
    localStorage.setItem('isJobs', 'true');


    this._router.navigate(['register-user']);

    return false;
  }

  turno(turno: string, indice: number) {
    this.userJobsArray[indice].schedule.concat(turno);
  }

}

class Turno {
  constructor(
    public matutino: boolean,
    public vespertino: boolean,
    public nocturno: boolean
  ) { }
}
