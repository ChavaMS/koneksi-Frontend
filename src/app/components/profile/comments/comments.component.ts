import { Component, OnInit, Input } from '@angular/core';

import { UserProducts } from 'src/app/models/userProducts';

import { InteractionsService } from '../../../services/interactions.service';
import { UserServices } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Comments } from '../../../models/comments';
import { UserJobs } from 'src/app/models/userJobs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() products: [UserProducts];
  @Input() receiver: string;
  @Input() jobs: [UserJobs];

  @Input() isUserProducts: boolean;
  @Input() isUserService: boolean;
  @Input() isUserJobs: boolean;



  private token: string;
  private identity: string;
  public status: string;
  public comentario: Comments;
  public opcionSeleccionado: string;
  public comments: [Comments];
  public url: string;
  public numbers;
  public sinComentarios: boolean;
  
  constructor(
    private _InteractionsService: InteractionsService,
    private _UserService: UserServices
  ) {
    this.token = this._UserService.getToken();
    this.identity = this._UserService.getIdentity();
    this.comentario = new Comments('', '', '', '', new Date(), '');
    this.url = GLOBAL.url;
    this.numbers = new Array();
    this.sinComentarios = true;

  }

  ngOnInit(): void {
    if(this.isUserJobs)
      this.opcionSeleccionado = this.jobs[0]._id;
    if(this.isUserProducts)
      this.opcionSeleccionado = this.products[0]._id;
    this.getComments(1);
  }

  getComments(page = 1) {
    this.comentario.receiver = this.receiver;
    this.comentario.activity_id = this.opcionSeleccionado;

    this._InteractionsService.getComments(this.comentario, page).subscribe(response => {
      if (response) {
        console.log(response);

        this.comments = response.comment;
        this.numbers = new Array();
        for (let i = 0; i < response.pages; i++) {
          this.numbers[i] = (i + 1);
        }
        if(this.numbers.length == 0){
          console.log('entro 1');
          this.sinComentarios = true;
        }else{
          console.log('entro 2');
          this.sinComentarios = false;
        }
      }
    }, err => {
      if (err) {
        console.log(err);

        this.status = 'error';
      }
    });

  }

  onSubmit(form) {
    this.comentario.receiver = this.receiver;
    this.comentario.emitter = this._UserService.getIdentity()._id;

    //console.log(this.comentario);

    this._InteractionsService.addComment(this.token, this.comentario).subscribe(response => {
      if (response) {
        this.status = 'success';
        form.reset();

        this.getComments(1);
      }
    }, error => {
      if (error) {
        this.status = 'error';
      }
    });
  }
}
