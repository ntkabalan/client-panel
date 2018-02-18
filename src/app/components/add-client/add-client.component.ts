import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';

import { ClientService } from '../../services/client.service'

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  private newClient: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  private disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) {
    this.disableBalanceOnAdd = false;
  }

  ngOnInit() {
  }

  private onSubmit({ value, valid }: { value: Client, valid: boolean }): void {
    if (this.disableBalanceOnAdd) value.balance = 0;
    if (!valid) {
      // Show error message
      this.flashMessagesService.show('Oops! Please make sure the form was filled in correctly.', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Add a new client
      this.clientService.addClient(value);

      // Show success message
      this.flashMessagesService.show('New client added!', {
        cssClass: 'alert-success',
        timeout: 4000
      });

      // redirect to dashboard
      this.router.navigate(['/']);
    }
  }

}
