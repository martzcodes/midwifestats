import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MidwifeAdminRoutingModule } from './midwife-admin-routing.module';
import { MidwifeAdminComponent } from './midwife-admin.component';

@NgModule({
  imports: [
    CommonModule,
    MidwifeAdminRoutingModule
  ],
  declarations: [MidwifeAdminComponent]
})
export class MidwifeAdminModule { }
