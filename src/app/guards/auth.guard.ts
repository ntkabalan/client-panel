import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs/observable';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
    ) { }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.map(auth => {
            if (!auth) {
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        });
    }

}