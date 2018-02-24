import { Component, OnInit } from '@angular/core'

import { FlashMessagesService } from 'angular2-flash-messages';

import { SettingsService } from '../../services/settings.service';

import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private settings: Settings

  constructor(
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.updateSettings(this.settings);
    this.flashMessagesService.show('Settings updated', {
      cssClass: 'alert-success',
      timeout: 4000
    });
  }

}
