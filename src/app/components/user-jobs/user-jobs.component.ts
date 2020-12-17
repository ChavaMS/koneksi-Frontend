import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserServices } from '../../services/user.service';
import { User } from '../../models/user';
import { UserJobs } from '../../models/userJobs';

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.css']
})
export class UserJobsComponent implements OnInit {

  @Input() userJobsA: UserJobs;
  
  public user: User;
  public isUserJobs: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserServices
  ) { 
    this.isUserJobs = true;
    this.loadPage();
   }

  ngOnInit(): void {
    console.log('Jobs cargado');
    
  }

  //Obtiene el id de la url 
  loadPage() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      
      this.getUser(id);
    });
  }

  //Obtiene el usuario con ese id
  getUser(id) {
    this._userService.getUserJobs(id).subscribe(
      response => {
        if (response.user && response.userJobs) {
    
          this.user = response.user[0];
          this.userJobsA = response.userJobs;
        } else {
          status = 'error';
        }
      }, error => {
        console.log(<any>error);
        this._router.navigate(['/login']);
      });
  }


}
