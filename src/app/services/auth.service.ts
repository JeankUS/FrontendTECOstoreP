import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, user  } from '@angular/fire/auth';
import { signInWithPopup } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth ) { }

  async emailLogin(email: string, password: string): Promise<any> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  

  async SignOut() {
    await this.auth.signOut();
  }
  
  async signInWithGoogle(){

    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth,provider).then((re)=>{
      console.log(re);
      
      // toast.success("Inicio de sesión exitoso");
      const token = provider;

    // The signed-in user info.
    const user = re.user;
    
    console.log(user)
    })
    .catch((err)=>{
      // toast.error("Error al iniciar sesión");
      console.log(err)
    })
  }  
  
}
