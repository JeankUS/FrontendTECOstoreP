import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from 'src/app/login.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
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

  //Inicialización de objetos
  usuario: login = { correo: '', contra: '' };

  //Otros
  passLock = true;

  //Constructor
  constructor(
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

  loginWithEmail() {
    const usuario: login = {
      correo: this.loginForm.value.email,
      contra: this.loginForm.value.password
    }
    this._serviceAuth.emailLogin(usuario.correo, usuario.contra).then(() => {
      this.router.navigate(['/home']);
    }).catch(err => {
      if(err.message=="Firebase: Error (auth/user-not-found)."){
        this.toastr.error("El usuario ingresado no existe","Error al iniciar sesión")
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
