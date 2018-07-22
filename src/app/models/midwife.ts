export class Midwife {
  vanity: string;
  uid: string;
  babies: number;
  outOf: number;
  name: string;
  photo?: string;

  constructor(midwife: Midwife) {
    this.vanity = midwife.vanity;
    this.uid = midwife.uid;
    this.babies = midwife.babies;
    this.outOf = midwife.outOf;
    this.name = midwife.name;
    this.photo = midwife.photo || '';
  }
}
