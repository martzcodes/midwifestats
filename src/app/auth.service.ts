import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { User, UserDetails, WriteableUser } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  userDetails$: BehaviorSubject<UserDetails> = new BehaviorSubject(null);
  authState: any = null;
  userId: string;
  babes = '';

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.user = firebaseAuth.user;
    this.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.retrieveUser(new User(user)).then(userDetails => {
          this.userDetails$.next(userDetails);
        });
      }
    });
    this.firebaseAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  retrieveUser(user: User): Promise<UserDetails> {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref('/users/' + user.uid)
        .once('value')
        .then(snapshot => {
          const details = snapshot.val();
          if (details !== null) {
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
    return this.firebaseAuth.auth;
  }

  social(providerName): Promise<UserDetails> {
    let provider;
    switch (providerName) {
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;

      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        break;

      default:
        throw new Error('Invalid provider.');
    }
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.signInWithPopup(provider).then(auth => {
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

  getVanity(vanity) {
    console.log(vanity);
    firebase
      .database()
      .ref('users')
      .orderByChild('vanity')
      .equalTo(vanity)
      .on('value', function(snapshot) {
        console.log(snapshot);
      });
  }

  logout() {
    this.userDetails$.next(null);
    return this.firebaseAuth.auth.signOut();
  }
}
