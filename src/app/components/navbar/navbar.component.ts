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

  estocito = false;
  constructor(private auth: Auth) { }

  ngOnInit(): void {
    this.validLoging();
  }

  esto() {
    // var myDropdown = document.getElementById('navbarDropdown')
    // if (myDropdown!=null){
    //   myDropdown.addEventListener('show.bs.dropdown', function onmouseover(event) {
    //     console.log("Waao")
    //   })
    // }
    // return true

    const menuPerfilDropdown = document.getElementById("menuPerfilDropdown")
    const o = document.getElementById("navbarDropdown")
    if (menuPerfilDropdown !== null) {
      if (menuPerfilDropdown.className == "nav-item dropdown") {
        menuPerfilDropdown.className = "nav-item dropdown show";

        console.log(menuPerfilDropdown.className)
        if (o != null) {
          if (o.onmouseover != null) {
            o.ariaExpanded = "true"
            console.log(o.ariaExpanded)
            return true;
          }
        }
      } else if (menuPerfilDropdown.className == "nav-item dropdown show") {
        menuPerfilDropdown.className = "nav-item dropdown";
        if (o != null) {
          if (o.onmouseover != null) {
            o.ariaExpanded = "false"
            console.log(o.ariaExpanded)
            return true;
          }
        }
      }
    } return true;
  }

  validLoging() {
    if (this.auth.currentUser !== null) {
      return true
    } else {
      return false
    }
  }

  SignOut() {
    this.auth.signOut();
  }
}
