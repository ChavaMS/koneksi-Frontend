import { Component, OnInit } from '@angular/core';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-edit',
  templateUrl: './main-edit.component.html',
  styleUrls: ['./main-edit.component.css']
})
export class MainEditComponent implements OnInit {

  public identity;

  constructor(
    private _userService: UserServices
  ) { 
    this.identity = _userService.getIdentity();

  }

  ngOnInit(): void {
  }

}
