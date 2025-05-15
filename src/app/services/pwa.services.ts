import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PwaService {
  isPwaInstallSupported(): boolean {
    return 'onbeforeinstallprompt' in window;
  }
}
