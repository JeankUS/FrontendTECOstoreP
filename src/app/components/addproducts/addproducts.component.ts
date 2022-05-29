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

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
  registerProducto: FormGroup;
  passLock = true;
  submitted = false;
  loading = false;
  mostrarImagen = false;
  esteUrlImagen: string | null = ''

  //Listas
  empresas: userEmpresa[] = [];
  imagenes: any[] = [];
  //Inicialización de objetos
  usuario: userEmpresa = { idj: '', nombre: '', telefono: '', correo: '', contra: '' };


  producto: product = { nombreEmpresa: '', idProducto: '', nombre: '', categoria: '', descripcion: '', imagen: '' }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _serviceAuth: AuthService,
    private _userService: UsersService,
    private _productsService: ProductsService,
    private toastr: ToastrService,
    private auth: Auth,
    private _storageService: StorageService) {
    this.registerProducto = this.fb.group({
      idProducto: ['', Validators.required],
      nombre: ['', Validators.required],
      categoria: ['',Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getUsuarios();
  }



  uploadImgStorage(event: any) {
    let idGenerated = Math.random().toString(36).substring(2, 32)                             //genera un id random para la dirección url de la imagen
    this.esteUrlImagen = 'cargando'
    let archivos = event.target.files
    let reader = new FileReader();
    this.mostrarImagen = true
    reader.readAsDataURL(archivos[0]);
    if(archivos[0]==null){
      this.mostrarImagen = false
    }
    reader.onloadend = () => {
      // console.log(reader.result)
      this.imagenes.push(reader.result)
      this._storageService.subirImagen(idGenerated, reader.result).then(urlImagen => {
        this.esteUrlImagen = urlImagen
        this.toastr.success('La imagen se ha cargado exitosamente.', 'Imagen cargada', { positionClass: 'toast-bottom-right' });
      });
    }
  }

  getUsuarios() {
    this._userService.getUsuarios().subscribe((res: userEmpresa[]) => {
      this.empresas = res;
    });
  }

  volverCarga() {
    // this.editando = false;
    this.router.navigate(['/Miperfil']);
    this.getUsuarios();
  }

  buscarIDEmpresa() {
    if (this.auth.currentUser != null) {
      for (let i = 0; i < this.empresas.length; i++) {
        if (this.empresas[i].correo == this.auth.currentUser.email) {
          return this.empresas[i].nombre
        }
      }
    } return null
  }

  agregarProducto() {
    if (this.esteUrlImagen != null && this.esteUrlImagen != '' && this.esteUrlImagen != 'cargando') {
      var nE = this.buscarIDEmpresa();
      if (nE != null) {
        const producto: product = {
          nombreEmpresa: String(nE),
          idProducto: this.registerProducto.value.idProducto,
          nombre: this.registerProducto.value.nombre,
          categoria: this.registerProducto.value.categoria.toLowerCase(),
          descripcion: this.registerProducto.value.descripcion,
          imagen: this.esteUrlImagen
        }
        this.loading = true;
        
        this._productsService.agregarProducto(producto).then(() => {
          this.loading = false;
          this.toastr.success('El producto fue registrado con éxito.', 'Producto Registrado', { positionClass: 'toast-bottom-right' });
          this.router.navigate(['/Miperfil']);

        }).catch(err => {
          console.log(err);
        })
      }

    } else {
      this.toastr.info('Aún no se han completado la carga de atributos.', 'Info', { positionClass: 'toast-bottom-right' });
    }


  }

}
