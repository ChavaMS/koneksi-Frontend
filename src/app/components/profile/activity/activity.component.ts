import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  cambiarVista(option: string) {
    if (option == 'des') {
      document.getElementById('productsUserProfile').classList.remove('d-block');
      document.getElementById('productsUserProfile').classList.add('d-none');

      document.getElementById('descripcion').classList.remove('d-none');
      document.getElementById('descripcion').classList.add('d-block');
    }

    if (option == 'pro') {
      document.getElementById('productsUserProfile').classList.remove('d-none');
      document.getElementById('productsUserProfile').classList.add('d-block');

      document.getElementById('descripcion').classList.remove('d-block');
      document.getElementById('descripcion').classList.add('d-none');
    }

  }
}
