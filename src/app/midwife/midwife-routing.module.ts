import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MidwifeContainerComponent } from './midwife-container/midwife-container.component';

const routes: Routes = [
  {
    path: '',
    component: MidwifeContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MidwifeRoutingModule {}
