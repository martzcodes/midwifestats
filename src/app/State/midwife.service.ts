import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { User, UserDetails, WriteableUser } from '../models/user';
import { Midwife } from '../models/midwife';
import { database, auth as firebaseAuth, User as firebaseUser } from 'firebase';
import { Store } from '@ngrx/store';
import * as fromMidwife from './midwife.reducer';
import * as MidwifeActions from './midwife.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MidwifeService {
  user: Observable<firebase.User>;
  userDetails$: BehaviorSubject<UserDetails> = new BehaviorSubject(null);
  authState: any = null;
  userId: string;
  ref: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private store: Store<fromMidwife.State>,
    private router: Router
  ) {
    this.user = afAuth.user;
    this.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.retrieveUser(new User(user)).then(userDetails => {
          this.userDetails$.next(userDetails);
        });
      }
    });
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  retrieveUser(user: User): Promise<UserDetails> {
    return new Promise((resolve, reject) => {
      this.db.database.ref('/users/' + user.uid).on('value', snapshot => {
        const details = snapshot.val();
        if (details !== null) {
          this.userDetails$.next(new UserDetails(details));
          resolve(new UserDetails(details));
        } else {
          resolve(this.set(user.uid, user));
        }
      });
    });
  }

  set(id, data): Promise<UserDetails> {
    const formatted = new WriteableUser(data);
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('users')
        .child(id)
        .set(formatted)
        .then(snapshot => {
          resolve(this.retrieveUser(new User({ uid: id })));
        });
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserObservable(): any {
    return this.afAuth.auth;
  }

  social(providerName): Promise<UserDetails> {
    let provider;
    switch (providerName) {
      case 'twitter':
        provider = new firebaseAuth.TwitterAuthProvider();
        break;

      case 'facebook':
        provider = new firebaseAuth.FacebookAuthProvider();
        break;

      default:
        throw new Error('Invalid provider.');
    }
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(provider).then(auth => {
        const entity = {
          name: auth.user.providerData[0].displayName,
          email: auth.user.providerData[0].email,
          anonymous: true,
          profileImageUrl: auth.user.providerData[0].photoURL,
          authProvider: providerName
        };
        const user = new User(auth.user);
        this.retrieveUser(user).then(userDetails => {
          this.userDetails$.next(userDetails);
          resolve(userDetails);
        });
      });
    });
  }

  checkMidwife(vanity: string, userId?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const ref = database().ref('vanities');

      ref
        .orderByChild('vanity')
        .equalTo(vanity)
        .on('value', snapshot => {
          const vanities = snapshot.val();
          if (vanities && Object.keys(vanities).length !== 0) {
            const van = new Midwife(vanities[Object.keys(vanities)[0]]);
            resolve(userId ? van.uid !== userId : true);
          } else {
            resolve(false);
          }
          ref.off();
        });
    });
  }

  getMidwife(vanity: string) {
    if (this.ref) {
      this.ref.off();
    }
    this.ref = database().ref('vanities');

    this.ref
      .orderByChild('vanity')
      .equalTo(vanity)
      .on('value', snapshot => {
        const midwives = snapshot.val();
        if (midwives && Object.keys(midwives).length !== 0) {
          const midwife = new Midwife(midwives[Object.keys(midwives)[0]]);
          this.store.dispatch(new MidwifeActions.LoadMidwifeSuccess(midwife));
        } else {
          // error?
        }
      });
  }

  setVanity(vanity: string) {
    const uid = this.userId;
    return new Promise((resolve, reject) => {
      this.checkMidwife(vanity, this.userId).then(disallowed => {
        if (!disallowed) {
          this.db.database
            .ref(`vanities/${this.userId}`)
            .once('value', vanitySnapshot => {
              if (!vanitySnapshot.val()) {
                const midwife = new Midwife({
                  vanity: vanity,
                  uid: this.userId,
                  babies: 0,
                  outOf: 10000,
                  name: this.authState.displayName || '',
                  photo: this.authState.photoURL || ''
                });
                this.db.database
                  .ref('vanities')
                  .child(uid)
                  .set(midwife)
                  .then(() => {
                    this.db.database
                      .ref('users')
                      .child(uid)
                      .child('vanity')
                      .set(vanity)
                      .then(() => {
                        this.store.dispatch(
                          new MidwifeActions.LoadMidwife(vanity)
                        );
                        // this.router.navigate([vanity]);
                        resolve();
                      });
                  });
              } else {
                this.db.database
                  .ref('vanities')
                  .child(uid)
                  .child('vanity')
                  .set(vanity)
                  .then(() => {
                    this.db.database
                      .ref('users')
                      .child(uid)
                      .child('vanity')
                      .set(vanity)
                      .then(() => {
                        this.store.dispatch(
                          new MidwifeActions.LoadMidwife(vanity)
                        );
                        resolve();
                      });
                  });
              }
            });
        }
      });
    });
  }

  saveMidwife(midwife: Midwife) {
    const uid = this.userId;
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('vanities')
        .child(uid)
        .set(midwife)
        .then(() => {
          this.store.dispatch(new MidwifeActions.LoadMidwife(midwife.vanity));
          resolve();
        });
    });
  }

  logout() {
    this.userDetails$.next(null);
    this.router.navigate(['/']);
    return this.afAuth.auth.signOut();
  }
}
