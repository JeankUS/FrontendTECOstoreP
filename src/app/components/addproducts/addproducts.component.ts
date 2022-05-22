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


  producto: product = { idEmpresa: '', idProducto: '', nombre: '', descripcion: '', imagen: '' }

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
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getUsuarios();
  }



  uploadImgStorage(event: any) {
    let idGenerated = Math.random().toString(36).substring(2, 32)
    this.imagenes = []
    let archivos = event.target.files
    let reader = new FileReader();
    this.mostrarImagen = true
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      // console.log(reader.result)
      this.imagenes.push(reader.result)
      this._storageService.subirImagen(idGenerated, reader.result).then(urlImagen => {
        this.esteUrlImagen = urlImagen
        this.toastr.success('La imagen se ha cargado exitosamente.', 'Imagen cargada', { positionClass: 'toast-bottom-right' });
      });
    }
  }

  aviso(){
    this.toastr.info('Aún no se han completado la carga de atributos.', 'Info', { positionClass: 'toast-bottom-right' });
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
          return this.empresas[i].idj
        }
      }
    } return null
  }

  agregarProducto() {

    var idj = this.buscarIDEmpresa();
    if (idj != null) {
      const producto: product = {
        idEmpresa: String(idj),
        idProducto: this.registerProducto.value.idProducto,
        nombre: this.registerProducto.value.nombre,
        descripcion: this.registerProducto.value.descripcion,
        imagen: this.esteUrlImagen
      }
      this.loading = true;
      // console.log(idj)
      this._productsService.agregarProducto(producto).then(() => {
        this.loading = false;
        console.log(producto)
        this.toastr.success('El producto fue registrado con éxito.', 'Producto Registrado', { positionClass: 'toast-bottom-right' });
        this.router.navigate(['/Miperfil']);

      }).catch(err => {
        console.log(err);
      })
    }


  }

}
