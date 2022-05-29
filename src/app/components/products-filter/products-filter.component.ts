import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';
import { userEmpresa } from 'src/app/usuarioEmpresa.model';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  noresults= false;
  passLock = true;
  submitted = false;
  loading = false;
  primeraVez = false;
  mostrarImagen = false;
  urlImagen: string | null = ''
  idDelProducto: string | null = ''
  pages: number = 1;
  formSearch!: FormGroup;
  //Listas
  empresas: userEmpresa[] = [];
  productos: product[] = []
  misProductos: product[] = [];
  listaCategorias: product[] = [];
  imagenes: any[] = [];
  //Inicialización de objetos
  usuario: userEmpresa = { idj: '', nombre: '', telefono: '', correo: '', contra: '' };
  producto: product = { nombreEmpresa: '', idProducto: '', nombre: '', categoria: '', descripcion: '', imagen: '' }

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
    this.formSearch = this.initForm();
    this.getUsuarios()
    this.getProductos()

  }

  initForm(): FormGroup {
    return this.fb.group({
      search: ['', [Validators.required]],
      category: ['', Validators.required]
    })
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
    this._userService.getUsuarios().subscribe((res: userEmpresa[]) => {
      this.empresas = res;
    });
  }

  ordenar(items: product[]) {
    items.sort(function (a, b) {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }


  searchiando() {
    this.noresults=false
    // Consulta sin filtros ni busqueda especifica
    if (this.formSearch.get('search')?.value == '' && this.formSearch.get('category')?.value == '') {
      this.misProductos = []
      this.misProductos = this.productos
    }
    // Consulta solo por categoria seleccionada
    if ((this.formSearch.get('category')?.value != '' && this.formSearch.get('search')?.value == '')) {
      this.misProductos = []
      this.misProductos = this.productos
      if (this.formSearch.get('category')?.value == 'np') {
        this.misProductos.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
      if (this.formSearch.get('category')?.value == 'ne') {
        this.misProductos.sort(function (a, b) {
          if (a.nombreEmpresa > b.nombreEmpresa) {
            return 1;
          }
          if (a.nombreEmpresa < b.nombreEmpresa) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
      if (this.formSearch.get('category')?.value == 'c') {
        this.misProductos.sort(function (a, b) {
          if (a.categoria > b.categoria) {
            return 1;
          }
          if (a.categoria < b.categoria) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
      if (this.formSearch.get('category')?.value == 'cp') {
        this.misProductos.sort(function (a, b) {
          if (a.idProducto > b.idProducto) {
            return 1;
          }
          if (a.idProducto < b.idProducto) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
    }


    if ((this.formSearch.get('category')?.value != '' && this.formSearch.get('search')?.value != '')) {
      if (this.formSearch.get('category')?.value == 'np') {
        for (let i = 0; i < this.productos.length; i++) {
          if (this.formSearch.get('search')?.value.toLowerCase() == this.productos[i].nombre.toLowerCase()) {
            this.misProductos = []
            this.misProductos.push(this.productos[i])
          }
        }
        this.misProductos.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
      if (this.formSearch.get('category')?.value == 'ne') {
        for (let i = 0; i < this.productos.length; i++) {
          if (this.formSearch.get('search')?.value.toLowerCase() == this.productos[i].nombreEmpresa.toLowerCase()) {
            this.misProductos = []
            this.misProductos.push(this.productos[i])
          }
        }
        this.misProductos.sort(function (a, b) {
          if (a.nombreEmpresa > b.nombreEmpresa) {
            return 1;
          }
          if (a.nombreEmpresa < b.nombreEmpresa) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
      if (this.formSearch.get('category')?.value == 'c') {
        for (let i = 0; i < this.productos.length; i++) {
          if (this.formSearch.get('search')?.value.toLowerCase() == this.productos[i].categoria.toLowerCase()) {
            this.misProductos = []
            this.misProductos.push(this.productos[i])
          }
        }
        this.misProductos.sort(function (a, b) {
          if (a.categoria > b.categoria) {
            return 1;
          }
          if (a.categoria < b.categoria) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
      if (this.formSearch.get('category')?.value == 'cp') {
        for (let i = 0; i < this.productos.length; i++) {
          if (this.formSearch.get('search')?.value.toLowerCase() == this.productos[i].idProducto.toLowerCase()) {
            this.misProductos = []
            this.misProductos.push(this.productos[i])
          }
        }
        this.misProductos.sort(function (a, b) {
          if (a.idProducto > b.idProducto) {
            return 1;
          }
          if (a.idProducto < b.idProducto) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
    }

    // Consulta solo por nombre de producto
    if (this.formSearch.get('search')?.value != '' && this.formSearch.get('category')?.value == '') {
      this.misProductos = []
      for (let i = 0; i < this.productos.length; i++) {
        if (this.formSearch.get('search')?.value.toLowerCase() == this.productos[i].nombre.toLowerCase()) {
          this.misProductos.push(this.productos[i])
        }
      }
    }
    if (this.misProductos.length == 0) {
      this.noresults=true
    }
  }

  getProductos() {
    const busqueda = document.getElementById("busqueda")
    // if (busqueda != null) {
    this._productsService.getProductos().subscribe((res: product[]) => {
      this.productos = res;
      this.getCategorias()
    })
    // }
  }

  buscarCategoriasRepetidas(categoria: string) {

    for (let j = 0; j < this.listaCategorias.length; j++) {
      if (this.listaCategorias[j].categoria == categoria) {
        return true
      }
    }
    return false
  }

  getCategorias() {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.buscarCategoriasRepetidas(this.productos[i].categoria) == false) {
        this.listaCategorias.push(this.productos[i])
      }
    }
  }

  buscarNombreEmpresa(idEmpresa: string) {
    for (let i = 0; i < this.empresas.length; i++) {
      if (idEmpresa == this.empresas[i].nombre) {
        return this.empresas[i].nombre
      }
    }
    return null
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
}
