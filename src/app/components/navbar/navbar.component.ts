import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { delay } from 'rxjs';
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
  cerrarMenu(event: any) {
    const navbarSupportedContent = document.getElementById("navbarSupportedContent")
    const menuPerfilDropdown = document.getElementById("menuPerfilDropdown")
    const navbarDropdown1 = document.getElementById("navbarDropdown1")
    const otro = document.getElementById("estocito")
    if (navbarSupportedContent != null) {
      if (menuPerfilDropdown !== null) {
        menuPerfilDropdown.className = "nav-item dropdown";

        if (navbarDropdown1 != null) {
          navbarDropdown1.ariaExpanded = "false"
          if (otro != null) {
            otro.className = "dropdown-menu"
            return false;
          }
        }
      }
    }
    return true;
  }
  abrirMenu(event: any) {
    // const menuPerfilDropdown = document.getElementById("menuPerfilDropdown")
    // const navbarDropdown1 = document.getElementById("navbarDropdown1")
    // const otro = document.getElementById("estocito")
    // if (menuPerfilDropdown !== null) {
    //   if (menuPerfilDropdown.className == "nav-item dropdown") {
    //     menuPerfilDropdown.className = "nav-item dropdown show";
    //     console.log(menuPerfilDropdown.className, "fuck")
    //     if (navbarDropdown1 != null) {
    //       navbarDropdown1.ariaExpanded = "true"
    //       if (otro != null) {
    //         otro.className = "dropdown-menu show"
    //       }
    //     }
    //   }
    // }

    // setTimeout(function () {
    //   if (menuPerfilDropdown !== null) {
    //     if (menuPerfilDropdown.className == "nav-item dropdown show") {
    //       menuPerfilDropdown.className = "nav-item dropdown";
    //       console.log(menuPerfilDropdown.className)
    //       if (navbarDropdown1 != null) {
    //         navbarDropdown1.ariaExpanded = "false"
    //         if (otro != null) {
    //           otro.className = "dropdown-menu"
    //         }
    //       }
    //     }
    //   }
    // }, 3000);
    // console.log("I am the second log");

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
