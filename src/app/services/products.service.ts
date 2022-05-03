import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, user} from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { product } from '../product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  agregarProducto(producto: product) {
    const productosRef = collection(this.firestore, 'productosI');
    return addDoc(productosRef, producto);
  }
  eliminarProducto(id: string): Promise<any> {
    const productosRef = doc(this.firestore, 'productosI/'+id);
    return deleteDoc(productosRef);
  }

  getProductos(): Observable<any[]> {
    const productos = collection(this.firestore, 'productosI');
    return collectionData(productos, { idField: 'id' }) as Observable<any[]>
  }

  updateProducto(id:string, producto: any): Promise<any> {
    const productDocRef = doc(this.firestore, 'productosI/'+id);
    return updateDoc(productDocRef, producto);
  }
}
