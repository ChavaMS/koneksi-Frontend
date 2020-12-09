import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { UserJobs } from 'src/app/models/userJobs';
import { UserJobsServices } from 'src/app/services/user.jobs.service';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-jobs-edit',
  templateUrl: './jobs-edit.component.html',
  styleUrls: ['./jobs-edit.component.css']
})
export class JobsEditComponent implements OnInit {

  public userJobsArray;
  public identity;
  public formProducts: FormGroup;
  public schedule;
  public names;
  public jobsA;
  public jobsB;
  public jobSelected;
  public jobSelectedArray;
  public userJobsForSaveArray;
  public status;

  constructor(
    private formBuilder: FormBuilder,
    private _userJobs: UserJobsServices,
    private _userService: UserServices
  ) {
    this.identity = this._userService.getIdentity();
    this.schedule = [[]];
    this.names = [];
    this.jobsA = [];
    this.jobsB = [];
    this.jobSelectedArray = [];
    this.userJobsForSaveArray = [];
  }

  ngOnInit(): void {
    this.initData();
    this.createForm();
  }

  initData() {
    this._userJobs.getUserJobs(this.identity._id).subscribe(response => {
      if (response) {
        this.userJobsArray = response.userJobs

        //Se filtra los oficios previamente selccionados para evitar doble igual
        this._userJobs.getJobs().subscribe(response => {
          if (response) {
            this.jobsA = response.response;

            this.jobsA.forEach(jobA => {
              let dentro = false;
              this.userJobsArray.forEach(element => {
                if (jobA._id == element.jobs._id) {
                  dentro = true;
                }
              });

              if (!dentro) {
                this.jobsB.push(jobA);
              }
            });

            //Se deja definido el primero
            this.jobSelected = this.jobsB[0]._id;
            this.jobsA = this.jobsB;
          }
        }, error => {

        });

        for (let i = 0; i < this.userJobsArray.length; i++) {
          this.schedule[i] = new Array();
          if (this.userJobsArray[i].schedule.includes('M')) {
            this.schedule[i][0] = true;
          } else {
            this.schedule[i][0] = false;
          }
          if (this.userJobsArray[i].schedule.includes('V')) {
            this.schedule[i][1] = true;
          } else {
            this.schedule[i][1] = false;
          }
          if (this.userJobsArray[i].schedule.includes('N')) {
            this.schedule[i][2] = true;
          } else {
            this.schedule[i][2] = false;
          }

        }

      }
    }, error => {

    });

  }

  deleteJob(index: number) {
    console.log('entra');
    console.log(this.userJobsArray[index]._id);

    this._userJobs.deleteJobs(this.userJobsArray[index]._id).subscribe(response => {
      if (response) {
        this.status = response.message;
      }
    }, error => {

    });
  }

  saveJobs() {
    for (let i = 0; i < this.jobSelectedArray.length; i++) {
      this.userJobsForSaveArray.push(new UserJobs('', '', '', '', '', ''));
    }

    for (let i = 0; i < this.jobSelectedArray.length; i++) {
      this.userJobsForSaveArray[i].user = this.identity._id;
      this.userJobsForSaveArray[i].description = this.formProducts.value.formA[i].description;
      this.userJobsForSaveArray[i].jobId = this.jobSelectedArray[i]._id;
      this.userJobsForSaveArray[i].tags = this.formProducts.value.formA[i].tags;

      let schedule: string = '';
      if (this.formProducts.value.formA[i].m) {
        schedule += 'M';
      }
      if (this.formProducts.value.formA[i].v) {
        schedule += 'V';
      }
      if (this.formProducts.value.formA[i].n) {
        schedule += 'N';
      }

      this.userJobsForSaveArray[i].schedule = schedule;
    }

    this._userJobs.saveUserJobs(this.userJobsForSaveArray).subscribe(response => {
      if (response) {
        console.log(response);
      }
    }, error => {

    });

  }

  guardar(index: number) {
    let horarios: string = '';
    if (this.schedule[index][0]) {
      horarios += 'M';
    }
    if (this.schedule[index][1]) {
      horarios += 'V';
    }
    if (this.schedule[index][2]) {
      horarios += 'N';
    }

    this.userJobsArray[index].schedule = horarios;

    this._userJobs.updateUserJobs(this.userJobsArray[index], this.userJobsArray[index]._id).subscribe(response => {
      if (response) {
        console.log(response);
      }
    }, error => {

    })

  }

  createForm() {
    this.formProducts = this.formBuilder.group({
      formA: this.formBuilder.array([])
    });
  }

  get formArray(): FormArray {
    return this.formProducts.get('formA') as FormArray;
  }

  deleteForm(id: number) {
    this.removeItemFromArr(this.jobSelectedArray, this.jobSelectedArray[id]);
    this.removeItemFromArr(this.names, this.names[id]);

    this.formArray.removeAt(id);
  }

  removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);

    if (i !== -1) {
      arr.splice(i, 1);
    }
  }


  addForm() {
    let seleccionado: boolean = false;
    this.jobSelectedArray.forEach(element => {
      if (this.jobsB[this.jobSelected] == element) {
        seleccionado = true;
      }
    });


    if (!seleccionado) {
      this.names.push(this.jobsB[this.jobSelected].name);
      this.jobSelectedArray.push(this.jobsB[this.jobSelected]);
      let fb = this.formBuilder.group({
        description: ['', Validators.required],
        tags: ['', Validators.required],
        m: [''],
        v: [''],
        n: ['']
      });
      this.formArray.push(fb);
      console.log(this.jobSelectedArray);

    }

  }


}
