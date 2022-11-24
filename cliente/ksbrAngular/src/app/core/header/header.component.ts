import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAutenticated: boolean;
  currentUser: any;
  qtyItems:Number = 0;
  constructor(private cartService: CartService,private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.countItems.subscribe((value)=>{
      this.qtyItems=value;
    });

    
    this.isAutenticated = true;
    let user = {
      nombre: 'Tom',
      email: 'kporrascruz@gmail.com'
    };
    this.currentUser = user;
  }

}
