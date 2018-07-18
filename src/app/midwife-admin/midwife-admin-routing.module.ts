import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MidwifeAdminComponent } from './midwife-admin.component';

const routes: Routes = [
  {
    path: '',
    component: MidwifeAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MidwifeAdminRoutingModule {}
