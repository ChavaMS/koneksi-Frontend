import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
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

  constructor(
    private _userService: UserServices
  ) {
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
    let address = new Array();
    address[0] = this.suburb;
    address[1] = this.street;
    address[2] = this.postalCode;
    this._userService.registerUser(this.user, address, this.files[0]).subscribe(response => {
      if (response) {

        this._userService.updateCoverPage(this.user.email, this.files[1]).subscribe(response => {
          if(response){
            console.log("Todo correcto");
            
          }
        }, err => {

        });

        console.log(response);
      }


    }, err => {

    })

    return false;
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.files.push(<File>event.target.files[0]);
    }
  }

}
