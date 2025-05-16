import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';

import { createUserWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc, serverTimestamp } from '@angular/fire/firestore';

// Ionic standalone imports
import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  async onSubmit() {
    const { email, password, username } = this.registerForm.value;

    try {
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = cred.user.uid;

      await setDoc(doc(this.firestore, 'user',uid), {
        username: username,
        role: 'employee',
        createdAt: serverTimestamp()
      });

      await setDoc(doc(this.firestore, 'username',username), {
        email: email
      });

      this.router.navigate(['/employee/calendar']);
    } catch (error) {
      console.error(error);
      alert((error as Error).message || 'Erreur lors de l’inscription');
    }
  }
}
