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
  editando = false;
  mostrarImagen = false;
  esteUrlImagen: string | null = ''
  idDelProducto: string | null = ''
  pages: number = 1;
  //Listas
  misProductos: product[] = [];
  editForm: FormGroup;
  // ----------------------------------------------------------
  empresas: userEmpresa[] = [];
  productos: product[] = []
  imagenes: any[] = [];
  //Inicialización de objetos
  usuario: userEmpresa = { idj: '', nombre: '', telefono: '', correo: '', contra: '' };
  producto: product = { idEmpresa: '', idProducto: '', nombre: '', categoria: '', descripcion: '', imagen: '' }
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
    this.editForm = fb.group({
      nombre: [''],
      categoria: [''],
      descripcion: [''],
      imagen: [''],
    })
  }

  ngOnInit(): void {
    this.getUsuarios()
    this.getProductos()
  }

  async editarProducto() {
    this.editando = true;
    if(this.esteUrlImagen=='' || this.esteUrlImagen==null || this.esteUrlImagen!='cargando'){
      this.imagenes[0]=this.esteUrlImagen;
    }
    // if (confirm("¿Estas seguro que deseas guardar los cambios?")) {
    const producto: product = {
      idEmpresa: this.buscarIDEmpresa()!,
      idProducto: this.idDelProducto!,
      nombre: this.editForm.value.nombre,
      categoria: this.editForm.value.categoria,
      descripcion: this.editForm.value.descripcion,
      imagen: this.esteUrlImagen
    }
    const q = query(collection(this.firestore, "productosI"), where("idProducto", "==", this.idDelProducto));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this._productsService.updateProducto(doc.id, producto).then(() => {
        this.editando = false;
        this.toastr.info('Empleado modificado con exito', 'Empleado modificado');
        this.router.navigate(['/Miperfil']);
        this.editando = false;
      })


    });

    // }
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
  obtenerIdProductoEditar(id: string) {
    this.editando = true;
    this.idDelProducto = id
    this.cargarEditarPerfil(id)
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
      if (this.empresas[i].idj == id) {
        return this.empresas[i]
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

  volverCarga() {
    this.editando = false;
    this.router.navigate(['/Myproducts']);
    // this.getProductos();
  }
  uploadImgStorage(event: any) {
    this.imagenes=[]
    let idGenerated = Math.random().toString(36).substring(2, 32)                             //genera un id random para la dirección url de la imagen
    this.esteUrlImagen = 'cargando'
    let archivos = event.target.files
    let reader = new FileReader();
    this.mostrarImagen = true
    reader.readAsDataURL(archivos[0]);
    if (archivos[0] == null) {
      this.mostrarImagen = false
    }
    reader.onloadend = () => {
      this.imagenes.push(reader.result)
      this._storageService.subirImagen(idGenerated, reader.result).then(urlImagen => {
        this.esteUrlImagen = urlImagen
        this.toastr.success('La imagen se ha cargado exitosamente.', 'Imagen cargada', { positionClass: 'toast-bottom-right' });
      });
    }
  }

  cargarEditarPerfil(id: string) {
    this.imagenes=[]
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].idProducto == id) {
        this.editForm.setValue({
          nombre: this.productos[i].nombre,
          categoria: this.productos[i].categoria,
          descripcion: this.productos[i].descripcion,
          imagen: this.imagenes.push(this.productos[i].imagen)
        })
      }
    }

  }

}
