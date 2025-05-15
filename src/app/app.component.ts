import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'ecoapp';
  private swUpdate = inject(SwUpdate);
  private toastCtrl = inject(ToastController);

  ngOnInit(): void {
    this.handleUpdates();
  }

  private handleUpdates() {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type === 'VERSION_READY') {
        this.presentUpdateToast();
      }
    });
  }

  private async presentUpdateToast() {
    const toast = await this.toastCtrl.create({
      message: 'Nouvelle version disponible.',
      duration: 7000,
      position: 'bottom',
      color: 'primary',
      buttons: [
        {
          text: 'Recharger',
          role: 'cancel',
          handler: async () => {
            await this.swUpdate.activateUpdate();
            window.location.reload();
          }
        }
      ]
    });
    await toast.present();
  }
}
