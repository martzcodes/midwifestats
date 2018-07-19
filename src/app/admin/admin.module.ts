import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { AdminService } from './admin.service';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AdminContainerComponent, AdminComponentComponent],
  providers: [AdminService]
})
export class AdminModule { }
