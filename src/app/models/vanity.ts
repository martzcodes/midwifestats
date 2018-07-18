export class Vanity {
    vanity: string;
    uid: string;
    babies: number;
    outOf: number;
    name: string;
    photo?: string;

    constructor(vanity: Vanity) {
        this.vanity = vanity.vanity;
        this.uid = vanity.uid;
        this.babies = vanity.babies;
        this.outOf = vanity.outOf;
        this.name = vanity.name;
        this.photo = vanity.photo || '';
    }
}
