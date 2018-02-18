import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  private clients: Client[];
  private totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.updateTotalOwed();
    });
  }

  private updateTotalOwed(): void {
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + client.balance;
    }, 0);
  }

}
