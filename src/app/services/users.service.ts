import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, user} from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { userEmpresa } from '../userM.model';


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

  getEmpleados(): Observable<any[]> {
    const empleados = collection(this.firestore, 'usuariosI');
    return collectionData(empleados, { idField: 'correo' }) as Observable<any[]>
  }

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
    // await sendEmailVerification(credential.user);

    // create user in db
    // ...
  }

  getEmpresa(correo: string):Observable<any[]>{
    const bookRef = doc(this.firestore, 'usuariosI/'+correo);
    return docData(bookRef, { idField: 'correo' }) as Observable<any>;
  }

}
