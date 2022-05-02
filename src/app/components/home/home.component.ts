import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit(): void {
    // this.validLoging();
  }

  validLoging() {
    if (this.auth.currentUser!== null) {
      return true
    } else {
      return false
    }
  }

}
