import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Midwife } from '../models/midwife';

@Injectable()
export class AdminService {
  constructor(private db: AngularFireDatabase) {}

  setMidwife(midwife: Midwife) {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('vanities')
        .child(midwife.uid)
        .set(midwife)
        .then(snapshot => {
          resolve();
        });
    });
  }
}
