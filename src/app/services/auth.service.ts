import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { switchMap, map, of, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  /** Utilisateur Firebase brut (email, UID, etc.) */
  public readonly firebaseUser$ = authState(this.auth);

  /** Utilisateur enrichi avec rôle depuis Firestore (users/{uid}) */
  public readonly user$ = this.firebaseUser$.pipe(
    switchMap(user => {
      if (!user) return of(null);
      const userRef = doc(this.firestore, `users/${user.uid}`);
      return docData(userRef, { idField: 'uid' });
    }),
    shareReplay(1)
  );

  /** Le rôle est admin ? */
  public readonly isAdmin$ = this.user$.pipe(
    map(user => user?.['role'] === 'admin')
  );

  /** Le rôle est employé ? */
  public readonly isEmployee$ = this.user$.pipe(
    map(user => user?.['role'] === 'employee')
  );
}
