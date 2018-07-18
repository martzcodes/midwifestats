import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MidwifeRoutingModule } from './midwife-routing.module';
import { MidwifeComponent } from './midwife.component';

@NgModule({
  imports: [
    CommonModule,
    MidwifeRoutingModule
  ],
  declarations: [MidwifeComponent]
})
export class MidwifeModule { }
