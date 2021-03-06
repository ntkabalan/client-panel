import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  private id: string;
  private client: Client;
  private disableBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get ID from URL
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClientById(this.id).subscribe(client => this.client = client);
    // Set placeholder client values
    this.client = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: 0
    }
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }): void {
    if (!valid) {
      this.flashMessagesService.show('Oops! Please make sure the form was filled in correctly.', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);

      this.flashMessagesService.show('Client updated', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.router.navigate([`/client/${this.id}`]);
    }
  }
}
