import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { userEmpresa } from 'src/app/userM.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser: FormGroup;
  passLock = true;
  submitted = false;
  loading= false;

  usuario: userEmpresa = { idj:'', nombre: '', telefono: '', correo: '', contra: '' };
  constructor(private fb: FormBuilder, private _usuarioService: UsersService, private router: Router, private toastr: ToastrService, private auth: Auth) {
    this.registerUser = this.fb.group({
      idj: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      contra: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  
  agregarUsuario() {
    const usuario: userEmpresa = {
      idj: this.registerUser.value.idj,
      nombre: this.registerUser.value.nombre,
      telefono: this.registerUser.value.telefono,
      correo: this.registerUser.value.correo,
      contra: this.registerUser.value.contra
    }
    this.loading = true;
    if (usuario.contra.length >= 6) {
      console.log(this.auth.currentUser)
      this._usuarioService.emailSignUp(usuario.correo, usuario.contra).then(() => {
        this._usuarioService.agregarUsuario(usuario).then(() => {
          this.loading = false;
          this.toastr.success('El empleado fue registrado con éxito.', 'Empleado Registrado', { positionClass: 'toast-bottom-right' });
          this.router.navigate(['/Login']);

        }).catch(err => {
          // console.log(err);
        })
      }).catch(err => {
        if (err.message == 'Firebase: Error (auth/invalid-email).') {
          this.toastr.error('El correo ingresado no es válido', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
        } else if (err.message == 'Firebase: Error (auth/email-already-in-use).') {
          console.log("123")
          this.toastr.error('El correo ingresado ya existe', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
        } else if(err.message == 'Firebase: Error (auth/missing-email).'){
          this.toastr.error('Por favor ingrese su correo', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
        }
        // console.log(err.message);

      })
    } else {
      this.toastr.error('La contraseña ingresada debe ser mayor a 6 carácteres', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
    }
  }

  buttonVPass() {
    if (this.passLock == true) {
      this.passLock = false;
      console.log(this.passLock)
    } else {
      this.passLock = true;
    }
  }
}
