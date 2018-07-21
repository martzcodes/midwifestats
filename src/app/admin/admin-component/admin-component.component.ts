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
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.scss']
})
export class AdminComponentComponent implements OnInit {
  @Input() midwife: Midwife;
  midwifePreview: Midwife;
  @Output() save: EventEmitter<Midwife> = new EventEmitter();
  midwifeForm: FormGroup;

  constructor(private midwifeService: MidwifeService) {}

  ngOnInit() {
    this.midwifePreview = Object.assign({}, this.midwife);
    this.midwifeForm = new FormGroup({
      name: new FormControl(this.midwife.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      outOf: new FormControl(this.midwife.outOf, [
        Validators.min(0),
        Validators.required
      ]),
      babies: new FormControl(this.midwife.babies, [
        Validators.min(0),
        Validators.required
      ])
    });
    this.midwifeForm.valueChanges.subscribe(changes => {
      Object.assign(this.midwifePreview, changes);
    });
  }

  saveMidwife() {
    this.save.emit(this.midwifePreview);
    this.midwifeForm.markAsPristine();
  }
}
