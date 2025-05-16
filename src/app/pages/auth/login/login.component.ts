import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

// Ionic imports standalone
import { IonContent, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    const { identifier, password } = this.loginForm.value;
    let email = identifier;

    try {
      if (!this.isValidEmail(identifier)) {
        const userRef = doc(this.firestore, `usernames/${identifier}`);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) throw new Error('Nom d’utilisateur introuvable.');
        email = userSnap.data()['email'];
      }

      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/employee/calendar']); // à affiner avec redirection dynamique plus tard
    } catch (error) {
      console.error(error);
      alert((error as Error).message || 'Erreur de connexion');
    }
  }

  private isValidEmail(input: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  }
}
