import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidwifeContainerComponent } from './midwife-container/midwife-container.component';
import { MidwifeComponentComponent } from './midwife-component/midwife-component.component';
import { MidwifeRoutingModule } from './midwife-routing.module';
import { MatProgressBarModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MidwifeRoutingModule,
    MatProgressBarModule,
    MatCardModule
  ],
  declarations: [MidwifeContainerComponent, MidwifeComponentComponent],
})
export class MidwifeModule { }
