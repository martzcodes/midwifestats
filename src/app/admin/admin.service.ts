import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Vanity } from '../models/vanity';

@Injectable()
export class AdminService {
  constructor(
    private db: AngularFireDatabase
  ) {}

  setVanity(vanity: Vanity) {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('vanities')
        .child(vanity.uid)
        .set(vanity)
        .then(snapshot => {
          console.log(snapshot.val());
          resolve();
        });
    });
  }
}
