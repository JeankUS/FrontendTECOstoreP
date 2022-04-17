import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { userM } from 'src/app/userM.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser: FormGroup;
  passLock = true;
  submitted = false;

  usuarios : userM[]=[];

  usuario: userM = { nombre: '', apellidos: '', correo: '', contra: '' };
  constructor(private fb: FormBuilder, private _usuarioService: UsersService, private router: Router, private toastr: ToastrService, private auth: Auth) {
    this.registerUser = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      contra: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  agregarUsuario() {
    const usuario: userM = {
      nombre: this.registerUser.value.nombre,
      apellidos: this.registerUser.value.apellidos,
      correo: this.registerUser.value.correo,
      contra: this.registerUser.value.contra
    }
    if (this.usuario.correo !== null) {
      this._usuarioService.getEmpleado(this.usuario.correo).subscribe(data => {
        console.log("Algo")
        if (usuario.contra.length >= 6) {
          this._usuarioService.emailSignUp(usuario.correo, usuario.contra).then(() => {
            // this.verificarCorreo();
            this._usuarioService.agregarUsuario(usuario).then(() => {
              this.toastr.success('El empleado fue registrado con éxito.', 'Empleado Registrado', { positionClass: 'toast-bottom-right' });
              this.router.navigate(['/Login']);
              
            }).catch(err => {
              this.toastr.error('El correo ingresado no es válido', 'Error al registrar', { positionClass: 'toast-bottom-right' });
            })
          })
        }else{
          this.toastr.error('La contraseña ingresada debe ser mayor a 6 caracteres', 'Error al registrar', { positionClass: 'toast-bottom-right' });
        }
      })
    }
    

    

    // this.loading = false;


  }

  
  verificarCorreo() {
    if (this.usuario.correo !== null) {
      this._usuarioService.getEmpleado(this.usuario.correo).subscribe(data => {
        
        // this.createEmpleado.setValue({
        // })
      })
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
