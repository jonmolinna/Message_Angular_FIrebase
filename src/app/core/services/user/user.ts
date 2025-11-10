import { inject, Injectable } from '@angular/core';
import { Firestore, docData, setDoc, doc } from '@angular/fire/firestore';
import { User as userAuth } from 'firebase/auth';
import { USER } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private firestore = inject(Firestore);

  createOrUpdateUser(user: userAuth): Promise<void> {
    const usuario: USER = {
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
      photoURL: user.photoURL || '',
    };

    // Crea un Refrencia de documento
    const userRef = doc(this.firestore, `usuarios/${usuario.uid}`);

    // Crea o Actualiza un documento
    return setDoc(userRef, usuario, { merge: true });
  }

  getUser(uid: string): Observable<USER | undefined> {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return docData(userRef) as Observable<USER | undefined>;
  }
}
