import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidwifeContainerComponent } from './midwife-container/midwife-container.component';
import { MidwifeComponentComponent } from './midwife-component/midwife-component.component';
import { MidwifeRoutingModule } from './midwife-routing.module';
import { MatProgressBarModule, MatCardModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import * as fromMidwife from '../State/midwife.reducer';
// import {MidwifeEffects} from '../State/midwife.effects';

@NgModule({
  imports: [
    CommonModule,
    MidwifeRoutingModule,
    MatProgressBarModule,
    MatCardModule,
    // StoreModule.forFeature('midwife', fromMidwife.reducer),
    // EffectsModule.forFeature([MidwifeEffects])
  ],
  declarations: [MidwifeContainerComponent, MidwifeComponentComponent],
  exports: [MidwifeComponentComponent]
})
export class MidwifeModule {}
