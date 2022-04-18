import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { GlobalVars } from 'src/app/common/global-vars';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor( private auth : Auth) { }

  ngOnInit(): void {
    this.validLoging();
  }

  validLoging() {
    if (this.auth.currentUser!== null) {
      console.log("esto si", this.auth.currentUser.email)
      return true
    } else {
      return false
    }
  }

  SignOut() {
    this.auth.signOut();
  }
}
