import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { AdminService } from './admin.service';
import { AdminRoutingModule } from './admin-routing.module';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule
} from '@angular/material';
import { MidwifeModule } from '../midwife/midwife.module';
import { MidwifeService } from '../State/midwife.service';
import { ReactiveFormsModule } from '@angular/forms';
import { VanityComponent } from './vanity/vanity.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatButtonModule,
    MidwifeModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  declarations: [AdminContainerComponent, AdminComponentComponent, VanityComponent],
  providers: [AdminService, MidwifeService]
})
export class AdminModule {}
