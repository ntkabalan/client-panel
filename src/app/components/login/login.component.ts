import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { FlashMessagesService } from 'angular2-flash-messages';
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: string;
  private password: string;

  constructor(
    private authService: AuthService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessageService.show('Welcome!', {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.flashMessageService.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      });
  }

}
