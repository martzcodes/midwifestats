import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { MidwifeGuard } from './midwife.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'my-profile',
    loadChildren:
      'src/app/admin/admin.module#AdminModule'
  },
  {
    path: ':vanity',
    loadChildren: 'src/app/midwife/midwife.module#MidwifeModule',
    canActivate: [MidwifeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
