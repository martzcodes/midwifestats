import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserDetails, User } from '../../models/user';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ValidatorFn,
  AbstractControl,
  AsyncValidatorFn,
  FormGroup
} from '@angular/forms';
import { MidwifeService } from '../../State/midwife.service';
import { Midwife } from '../../models/midwife';

@Component({
  selector: 'app-vanity',
  templateUrl: './vanity.component.html',
  styleUrls: ['./vanity.component.scss']
})
export class VanityComponent implements OnInit {
  @Input() user: UserDetails;
  @Output() vanity: EventEmitter<string> = new EventEmitter();
  vanityFormControl: FormControl;
  saved = false;

  constructor(private midwifeService: MidwifeService) {}

  ngOnInit() {
    this.vanityFormControl = new FormControl(
      this.user.vanity,
      [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z-]*')
      ],
      [forbiddenNameValidator(this.midwifeService)]
    );
  }

  saveVanity() {
    this.saved = true;
    this.vanity.emit(this.vanityFormControl.value);
  }
}

export function forbiddenNameValidator(
  midwifeService: MidwifeService
): AsyncValidatorFn {
  return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
    return new Promise((resolve, reject) => {
      midwifeService
        .checkMidwife(control.value, midwifeService.userId)
        .then(exists => {
          resolve(exists ? { forbiddenName: { value: control.value } } : null);
        });
    });
    // const forbidden = nameRe.test(control.value);
    // return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  };
}
