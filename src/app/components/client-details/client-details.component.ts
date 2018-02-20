import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  private id: string;
  private client: Client;
  private hasBalance: boolean;
  private showBalanceUpdateInput: boolean;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessageService: FlashMessagesService
  ) {
    this.hasBalance = false;
    this.showBalanceUpdateInput = false;
  }

  ngOnInit() {
    // Get ID from URL
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClientById(this.id).subscribe(client => {
      if (client) {
        if (client.balance > 0) this.hasBalance = true;
        this.client = client;
      }
    });
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessageService.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 4000
    });
  }

  onDeleteClick(client: Client) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(client);
      this.flashMessageService.show('Client Deleted', {
        cssClass: 'alert-success',
        timeout: 4000
      })
      this.router.navigate(['/']);
    }
  }

}
