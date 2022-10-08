import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAutenticated: boolean = false;
  currentUser: any;
  constructor() { }

  ngOnInit(): void {
    this.isAutenticated = true;
    let user = {
      nombre: 'Tom',
      email: 'kporrascruz@gmail.com'
    };
    this.currentUser = user;
  }

}
