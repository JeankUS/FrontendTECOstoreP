import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword  } from '@angular/fire/auth';

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

  
}
