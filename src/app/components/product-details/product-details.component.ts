import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';
import { userEmpresa } from 'src/app/usuarioEmpresa.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: string | null;

  empresas: userEmpresa[] = []
  productos: product[] = [];
  producto: product = { idEmpresa: '', idProducto: '', nombre: '', categoria: '', descripcion: '', imagen: '' };
  empresa: userEmpresa = { idj: '', nombre: '', telefono: '', correo: '', contra: '' }
  constructor(private router: Router,
    private fb: FormBuilder,
    private _serviceAuth: AuthService,
    private _userService: UsersService,
    private _productsService: ProductsService,
    private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.getProductos();

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
      this.getProducto();
    });
  }

  getProducto() {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.id != null) {
        if (this.id == this.productos[i].idProducto) {
          this.producto = this.productos[i]
          this.obtenerEmpresa(this.productos[i].idEmpresa)
        }
      }
    }
  }
  obtenerEmpresa(id: string) {
    for (let i = 0; this.empresas.length; i++) {
      if (this.empresas[i].idj == id) {
        this.empresa = this.empresas[i]
        break
      }
    }
  }
}
