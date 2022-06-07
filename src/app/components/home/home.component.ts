import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';
import { userEmpresa } from 'src/app/usuarioEmpresa.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  passLock = true;
  submitted = false;
  loading = false;
  mostrarImagen = false;
  urlImagen: string | null = ''
  idDelProducto: string | null = ''
  pages: number = 1;
  //Listas
  empresas: userEmpresa[] = [];
  productos: product[] = []
  misProductos: product[] = [];
  imagenes: any[] = [];
  //Inicialización de objetos
  usuario: userEmpresa = { idj: '', nombre: '', telefono: '', correo: '', contra: '' };
  producto: product = { idEmpresa: '', idProducto: '', nombre: '', categoria: '', descripcion: '', imagen: '' }

  constructor(private router: Router,
    private fb: FormBuilder,
    private _serviceAuth: AuthService,
    private _userService: UsersService,
    private _productsService: ProductsService,
    private toastr: ToastrService,
    private auth: Auth,
    private firestore: Firestore,
    private _storageService: StorageService) {

  }

  ngOnInit(): void {
    this.getUsuarios()
    this.getProductos()
  }

  getDatosEmpresa(idEmpresa: string) {
    if (idEmpresa != null) {
      for (let i = 0; i < this.empresas.length; i++) {
        if (this.empresas[i].idj == idEmpresa) {
          return this.empresas[i].nombre
        }
      }
    } return null
  }
  getUsuarios() {
    this.empresas = []
    this._userService.getUsuarios().subscribe((res: userEmpresa[]) => {
      this.empresas = res;

    });
  }
  getProductos() {
    this.productos = []
    this._productsService.getProductos().subscribe((res: product[]) => {
      this.productos = res;
      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].idEmpresa == this.buscarIDEmpresa()) {
          this.misProductos.push(this.productos[i])
        }
      }
    })
  }
  buscarIDEmpresa() {
    if (this.auth.currentUser != null) {
      for (let i = 0; i < this.empresas.length; i++) {
        if (this.empresas[i].correo == this.auth.currentUser.email) {
          return this.empresas[i].idj
        }
      }
    } return null
  }
  obtenerIdProducto(id: string) {
    this.idDelProducto = id
    return id
  }
  obtenerEmpresa(id: string) {
    for (let i = 0; this.empresas.length; i++) {
      if (this.empresas[i].idj = id) {
        return this.empresas[i]
      }
    }
    return null
  }
}
