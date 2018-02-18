import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/observable'

import { Client } from '../models/Client';


@Injectable()
export class ClientService {
  private client: Observable<Client>
  private clients: Observable<Client[]>
  private clientsCollection: AngularFirestoreCollection<Client>;
  private clientDoc: AngularFirestoreDocument<Client>

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {
    // Get clients with IDs from Firebase
    this.clients = this.clientsCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      });
    });
    return this.clients;
  }

}
