export class User {
  name: string;
  email: string;
  emailVerified: boolean;
  uid: string;
  photoUrl: string;
  authProvider: string;
  constructor(basic: any) {
    this.name = basic.displayName;
    this.email = basic.email;
    this.emailVerified = basic.emailVerified;
    this.uid = basic.uid;
    this.photoUrl = basic.photoURL;
    if (basic.providerData) {
      this.authProvider = basic.providerData[0].providerId;
    }
  }
}

export class WriteableUser {
  email: string;
  name: string;
  created: Date;
  updated: Date;
  authProvider: string;
  photoUrl: string;
  babies: number;
  vanity: string;

  constructor(details: any) {
    this.created = details.created || new Date();
    this.updated = details.updated || new Date();
    this.authProvider = details.authProvider || 'password';
    this.email = details.email || '';
    this.name = details.name || '';
    this.photoUrl = (details.photoUrl || '').replace(/http:/i, 'https:');
    this.babies = details.babies || 0;
    this.vanity = details.vanity || '';
  }
}

export class UserDetails extends WriteableUser {
  admin: boolean = false;

  constructor(details: any) {
    super(details);
    if (details.admin === 1) {
      this.admin = true;
    }
  }
}

export interface Authenticate {
  name?: string;
  email: string;
  password: string;
}
