import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/product.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from 'src/app/services/products.service';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { userEmpresa } from 'src/app/usuarioEmpresa.model';
import { StorageService } from 'src/app/services/storage.service';
import { query } from '@firebase/firestore';
import { collection, Firestore, getDocs, where } from '@angular/fire/firestore';
@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {
  passLock = true;
  submitted = false;
  loading = false;
  idDelProducto: string | null = ''
  pages: number = 1;
  //Listas
  misProductos: product[] = [];

  // ----------------------------------------------------------
  empresas: userEmpresa[] = [];
  productos: product[] = []
  //Inicialización de objetos
  usuario: userEmpresa = { idj: '', nombre: '', telefono: '', correo: '', contra: '' };
  producto: product = { idEmpresa: '', idProducto: '', nombre: '',categoria:'', descripcion: '', imagen: '' }
 // ----------------------------------------------------------

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


  getUsuarios() {
    this.empresas = []
    this._userService.getUsuarios().subscribe((res: userEmpresa[]) => {
      this.empresas = res;

    });
  }

  obtenerIdProducto(id: string) {
    this.idDelProducto = id
    return id
  }
  
  async eliminarProducto() {

    const q = query(collection(this.firestore, "productosI"), where("idProducto", "==", this.idDelProducto));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.router.navigate(['/ReloadMyproducts'])
      this._productsService.eliminarProducto(doc.id).then(() => {
        this.toastr.success('El producto fue eliminado con éxito', 'Producto eliminado!', {
          positionClass: 'toast-bottom-right'
        });
        // this.router.navigate(['/Miperfil'])
        
        // window.location.reload();
      }).catch(err => {
        console.log(err)
      });
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
  obtenerEmpresa(id: string) {
    for (let i = 0; this.empresas.length; i++) {
      if (this.empresas[i].idj = id) {
        return this.empresas[i]
      }
    }
    return null
  }

  editarProducto(){
    
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
}
