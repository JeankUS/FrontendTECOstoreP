import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, user} from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { userEmpresa } from '../usuarioEmpresa.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private firestore: Firestore, private auth: Auth) {
   }

  agregarUsuario(usuario: userEmpresa) {
    const usuariosRef = collection(this.firestore, 'usuariosI');
    return addDoc(usuariosRef, usuario);
  }
  eliminarUsuario(id: string): Promise<any> {
    const usuarioRef = doc(this.firestore, 'usuariosI/'+id);
    console.log(usuarioRef)
    return deleteDoc(usuarioRef);
  }

  getUsuarios(): Observable<any[]> {
    const empleados = collection(this.firestore, 'usuariosI');
    return collectionData(empleados, { idField: 'id' }) as Observable<any[]>
  }
  // getUsuarios(): Observable<any[]> {
  //   const empleados = collection(this.firestore, 'usuariosI');
  //   return collectionData(empleados, { idField: 'correo' }) as Observable<any[]>
  // }

  async emailSignUp(email: string, password: string)
    : Promise<void> {
 
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await updateProfile(
      credential.user, { displayName: credential.user.displayName }
    );
  }
  
  updateUsuario(id:string, usuario: any): Promise<any> {
    const userDocRef = doc(this.firestore, 'usuariosI/'+id);
    return updateDoc(userDocRef, usuario);
  }

}
