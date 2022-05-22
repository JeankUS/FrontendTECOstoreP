import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from 'src/app/login.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { userEmpresa } from 'src/app/usuarioEmpresa.model';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Formularios
  loginForm: FormGroup;

  //listas
  empresas: userEmpresa[] = []
  //Inicialización de objetos
  empresa: userEmpresa = { idj: '', nombre: '', telefono: '', correo: '', contra: '' };

  //Inicialización de objetos
  usuario: login = { correo: '', contra: '' };

  //Otros
  passLock = true;

  //Constructor+
  constructor(
    private firestore: Firestore,
    private router: Router,
    private fb: FormBuilder,
    private _serviceAuth: AuthService,
    private _userService: UsersService,
    private toastr: ToastrService,
    private auth: Auth) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  ngOnInit(): void {
  }

  getUsuarios() {
    this._userService.getUsuarios().subscribe((res: userEmpresa[]) => {
      this.empresas = res;
    });
  }

  loginWithEmail() {
    this.getUsuarios()
    const usuario: login = {
      correo: this.loginForm.value.email,
      contra: this.loginForm.value.password
    }

    for (let i = 0; i < this.empresas.length; i++) {
      if (this.empresas[i].correo == usuario.correo) {
        if (this.empresas[i].contra == usuario.contra) {
          this._serviceAuth.emailLogin(usuario.correo, usuario.contra).then(() => {
            this.router.navigate(['/home']);
          }).catch(err => {
            if (err.message == "Firebase: Error (auth/user-not-found).") {
              this.toastr.error("El usuario ingresado no existe", "Error al iniciar sesión")
            }
          })
        } else {
          this.toastr.error("La contraseña ingresada es inválida", "Error al iniciar sesión")
        }
      }
    }

    this._serviceAuth.emailLogin(usuario.correo, usuario.contra).then(() => {
      this.router.navigate(['/home']);
    }).catch(err => {
      if (err.message == "Firebase: Error (auth/user-not-found).") {
        this.toastr.error("El usuario ingresado no existe", "Error al iniciar sesión")
      }
    })
  }

  loginWithGoogle() {
    console.log("Login con google temporalmente fuera de servicio")
    // this._serviceAuth.signInWithGoogle().then(() => {

    // });
  }

  //Permite validar el boton de visualizar o no la contraseña
  buttonVPass() {
    if (this.passLock === true) {
      this.passLock = false;
    } else {
      this.passLock = true;
    }
  }
}
