import { Injectable } from '@angular/core';

import { Settings } from '../models/Settings'

@Injectable()
export class SettingsService {
  private settings: Settings;

  constructor() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'))
    } else {
      this.settings = {
        allowRegistration: true,
        disableBalanceOnAdd: false,
        disableBalanceOnEdit: false
      }
    }
  }

  public getSettings(): Settings {
    return this.settings;
  }

  public updateSettings(newSettings: Settings): void {
    this.settings = newSettings;
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

}
