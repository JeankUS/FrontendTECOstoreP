import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc } from '@angular/fire/firestore';
import { user } from '../user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {




  constructor(private firestore: Firestore, private auth: Auth) { }

  agregarUsuario(usuario: user) {
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

}
