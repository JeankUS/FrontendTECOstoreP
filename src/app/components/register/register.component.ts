import { Component, OnInit } from '@angular/core';
// import { GoogleAuthProvider } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { user } from 'src/app/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser: FormGroup;
  passLock = true;
  submitted = false;

  usuario: user = { nombre: '', apellidos: '', correo: '', contra: ''};
  constructor(private fb: FormBuilder, private _usuarioService: UsersService, private router: Router, private toastr: ToastrService) {
    this.registerUser =this.fb.group({
      nombre:['', Validators.required],
      apellidos:['', Validators.required],
      correo:['', Validators.required],
      contra:['', Validators.required]
    })
   }

  ngOnInit(): void {
  }
  agregarUsuario(){
    const usuario: user = {
      nombre: this.registerUser.value.nombre,
      apellidos: this.registerUser.value.apellidos,
      correo: this.registerUser.value.correo,
      contra: this.registerUser.value.contra
    }
    this._usuarioService.agregarUsuario(usuario).then(() => {
      this._usuarioService.emailSignUp(usuario.correo,usuario.contra).then(()=>{
        console.log("Se ha registrado exitosamente con el CORREO");
      })
      console.log("Empelado agregado con exito");
      this.toastr.success('El empleado fue registrado con éxito.', 'Empleado Registrado', { positionClass: 'toast-bottom-right' });
      // this.loading = false;
      this.router.navigate(['/Login']);
    }).catch(err => {
      console.error(err)
      // this.loading = false;
    })
  }
  // emailSignUp(){
    
  //   this._usuarioService.emailSignUp(this.usuario.correo,this.usuario.contra).then(()=>{
  //     console.log("Se ha registrado exitosamente con ");
  //   })
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
