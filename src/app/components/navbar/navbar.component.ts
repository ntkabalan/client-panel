import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SettingsService } from '../../services/settings.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private loggedIn: boolean;
  private loggedInUser: string;
  private showRegister: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.loggedIn = false;
      }
    });
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessageService.show('Signed out', {
      cssClass: 'alert-success',
      timeout: 4000
    })
    this.router.navigate(['/login']);
  }

}
