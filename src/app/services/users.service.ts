import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, user} from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { userM } from '../userM.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private firestore: Firestore, private auth: Auth) {
   }

  agregarUsuario(usuario: userM) {
    const usuariosRef = collection(this.firestore, 'usuariosI');
    return addDoc(usuariosRef, usuario);
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

  getEmpleado(correo: string):Observable<any[]>{
    const bookRef = doc(this.firestore, 'usuariosI/'+correo);
    return docData(bookRef, { idField: 'id' }) as Observable<any>;
  }

}
