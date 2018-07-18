import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'my-profile',
    loadChildren:
      'src/app/midwife-admin/midwife-admin.module#MidwifeAdminModule'
  },
  {
    path: ':vanity',
    loadChildren: 'src/app/midwife/midwife.module#MidwifeModule'
  },
  {
    path: '404',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
