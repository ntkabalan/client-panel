import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { FlashMessagesService } from 'angular2-flash-messages';
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private email: string;
  private password: string;
  private confirmPassword: string;

  constructor(
    private authService: AuthService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  private onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.flashMessageService.show('Passwords do not match...', {
        cssClass: 'alert-danger',
        timeout: 4000
      })
    } else {
      this.authService.register(this.email, this.password)
        .then(res => {
          this.flashMessageService.show('You are now registered and logged in!', {
            cssClass: 'alert-success',
            timeout: 4000
          });
          this.router.navigate(['/']);
        })
        .catch(error => {
          this.flashMessageService.show(error.message, {
            cssClass: 'alert-danger',
            timeout: 4000
          })
        });
    }
  }
}
