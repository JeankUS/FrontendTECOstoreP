import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { userEmpresa } from 'src/app/usuarioEmpresa.model';
@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
  //Formularios
  editForm: FormGroup;
  //listas
  empresas: userEmpresa[] = []
  //Inicialización de objetos
  usuario: userEmpresa = { idj: '', nombre: '', telefono: '', correo: '', contra: '' };
  //Otros
  passLock = false;
  editando = false;
  //Constructor
  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private auth: Auth,
    private firestore: Firestore) {
    this.editForm = fb.group({
      IDJ: [''],
      nombre: [''],
      telefono: [''],
      correo: [''],
      contra: [''],
    })
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  

  async editarEmpresa() {
    
    // if (confirm("¿Estas seguro que deseas guardar los cambios?")) {
      const empresa: any = {
        nombre: this.editForm.value.nombre,
        telefono: this.editForm.value.telefono,
        correo: this.editForm.value.correo,
        contra: this.editForm.value.contra
      }

      const q = query(collection(this.firestore, "usuariosI"), where("correo", "==", this.auth.currentUser?.email));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (this.auth.currentUser !== null) {
          for (let i = 0; i < this.empresas.length; i++) {
            if (this.empresas[i].correo == this.auth.currentUser.email) {
              this._usuarioService.updateUsuario(doc.id, empresa).then(() => {
                this.editando = false;
                this.toastr.info('Empresa modificado con exito', 'Empresa modificado');
                this.router.navigate(['/Miperfil']);
                this.editando = false;
              })
            }
          }
        }
      });

    // }
  }

  async eliminarUsuarioEmpresa() {
    const q = query(collection(this.firestore, "usuariosI"), where("correo", "==", this.auth.currentUser?.email));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (this.auth.currentUser !== null) {
        for (let i = 0; i < this.empresas.length; i++) {
          if(this.empresas[i].correo==this.auth.currentUser.email){   
            this._usuarioService.eliminarUsuario(doc.id).then(() => {
              this.auth.currentUser?.delete();
              this.toastr.error('El empleado fue eliminado con éxito', 'Registro eliminado!',{
                positionClass: 'toast-bottom-right'
              });
              this.auth.signOut();
              this.router.navigate(['/Login'])
            }).catch(err => {
              console.log(err)
            });
          }
        }
      }
    });
    
  }

  //cargas
  
  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe((res: userEmpresa[]) => {
      this.empresas = res;
      this.cargaEnMiPerfil();
    });
  }

  cargaEnMiPerfil() {
    this.editando=false;
    var cargaIDJ = document.getElementById("cargaIDJ");
    var cargaNE = document.getElementById("cargaNE");
    var cargaTE = document.getElementById("cargaTE");
    var cargaCE = document.getElementById("cargaCE");
    if (this.auth.currentUser !== null) {

      for (let i = 0; i < this.empresas.length; i++) {
        if (this.empresas[i].correo == this.auth.currentUser.email) {
          if (cargaIDJ != null) {
            cargaIDJ.textContent = this.empresas[i].idj
          }
          if (cargaNE != null) {
            cargaNE.textContent = this.empresas[i].nombre
          }
          if (cargaTE != null) {
            cargaTE.textContent = this.empresas[i].telefono
          }
          if (cargaCE != null) {
            cargaCE.textContent = this.empresas[i].correo
          }
        }
      }
    }

  }

  cargarEditarPerfil() {
    var formIDJ = document.getElementById("formIDJ");
    if (this.auth.currentUser !== null) {
      for (let i = 0; i < this.empresas.length; i++) {
        if (this.empresas[i].correo == this.auth.currentUser.email) {
          if (formIDJ != null) {
            formIDJ.style.borderColor = "white";
            formIDJ.onmousedown = function onmousedown(event) {
              return false
            }
          }
          this.editForm.setValue({
            IDJ: this.empresas[i].idj,
            nombre: this.empresas[i].nombre,
            telefono: this.empresas[i].telefono,
            correo: this.empresas[i].correo,
            contra: this.empresas[i].contra,
          })

        }
      }
    }
    this.editando = true
  }

  volverCarga(){
    this.editando = false;
    this.router.navigate(['/Miperfil']);
    this.getUsuarios();
  }

  //Validaciones
  buttonVPass() {
    if (this.passLock == true) {
      this.passLock = false;
    } else {
      this.passLock = true;
    }
  }
}
