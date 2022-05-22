import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faCoffee = faCoffee;
  //Formularios
  formG: FormGroup;
  //Listas

  //Otros

  //Constructor
  constructor(private auth: Auth, private fb: FormBuilder) {
    this.formG = this.fb.group({
      correo: ['']
    })
  }

  ngOnInit(): void {
    
  }

  prueba() {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event: any) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
    })()
  }

  submit() {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event: any) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
    })()
  }

  // <select> element displays its options on mousedown, not click.
  
  evento(event: any) {
    
    // ExpandSelect("selec");
    const selec = document.getElementById("selec")
    if (selec != null) {
      // ExpandSelect()

    }
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
}
