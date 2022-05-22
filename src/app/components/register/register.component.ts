import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { userEmpresa } from 'src/app/usuarioEmpresa.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //Formularios
  registrarEmpresa: FormGroup;
  //listas
  empresas: userEmpresa[] = []
  //Inicialización de objetos
  usuario: userEmpresa = { idj: '', nombre: '', telefono: '', correo: '', contra: '' };
  //Otros
  passLock = true;                                                                      //'passLock' Permite conocer el estado del input password
  submitted = false;
  loading = false;                                                                      //'loading' Permite conocer el estado del icono cargando
  //Constructor
  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private auth: Auth) {
    this.registrarEmpresa = this.fb.group({
      idj: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      contra: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  //Carga la lista de empresas con las empresas registradas en la base de datos
  cargarUsuarios() {
    this._usuarioService.getUsuarios().subscribe((res: userEmpresa[]) => {
      this.empresas = res;
    });
  }


  //Permite agregar un usuario empresa
  agregarEmpresa() {
    const usuario: userEmpresa = {
      idj: this.registrarEmpresa.value.idj,
      nombre: this.registrarEmpresa.value.nombre,
      telefono: this.registrarEmpresa.value.telefono,
      correo: this.registrarEmpresa.value.correo.toLowerCase(),
      contra: this.registrarEmpresa.value.contra
    }
    const doc = document.getElementById("formRegisterIdJ")
    this.loading = true;
    if (this.validarIDJ(this.registrarEmpresa.value.idj) == true) {
      if (doc != null) {
        doc.style.borderColor="red"
      }
      if (usuario.contra.length >= 6) {
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
            this.loading = false;
          } else if (err.message == 'Firebase: Error (auth/email-already-in-use).') {
            this.toastr.error('El correo ingresado ya existe', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
            this.loading = false;
          } else if (err.message == 'Firebase: Error (auth/missing-email).') {
            this.toastr.error('Por favor ingrese su correo', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
            this.loading = false;
          }
        })
      } else {
        this.toastr.error('La contraseña ingresada debe ser mayor a 6 carácteres', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
      }
    } else {
      this.toastr.error('La cédula jurídica ingresada ya existe.', 'Error al registrarse', { positionClass: 'toast-bottom-right' });
      this.loading = false;
    }
    this.loading = false;
  }


  //Validaciones
  validarIDJ(id: string) {
    for (let i = 0; i < this.empresas.length; i++) {
      if (this.empresas[i].idj == id) {
        return false;
      }
    }
    return true
  }

  //Permite validar el boton de visualizar o no la contraseña
  buttonVPass() {
    if (this.passLock == true) {
      this.passLock = false;
    } else {
      this.passLock = true;
    }
  }
}
