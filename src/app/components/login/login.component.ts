import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/app/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passLock = true;

  usuario: login = { correo: '', contra: '' };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _serviceAuth: AuthService,) {
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
      console.log("esto: ", usuario.correo, " esto otro: ", usuario.contra)
      console.log("Se ha logeado exitosamente");
    })
  }

  SignOut() {
    this._serviceAuth.SignOut().then(() => {
      window.alert('Logged out!');
    })
  }

  // login() {
  //   this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  // }
  // logout() {
  //   this.auth.signOut();
  // }

  buttonVPass() {
    if (this.passLock === true) {
      this.passLock = false;
      console.log(this.passLock)
    } else {
      this.passLock = true;
    }
  }
}
