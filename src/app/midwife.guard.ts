import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { MidwifeService } from './State/midwife.service';

@Injectable({
  providedIn: 'root'
})
export class MidwifeGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private midwifeService: MidwifeService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.midwifeService
      .checkMidwife(next.paramMap.get('vanity'))
      .then(res => {
        if (!res) {
          this.router.navigate(['404']);
        }
        return res;
      });
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.midwifeService.authenticated) {
      this.router.navigate(['404']);
    }
    return this.midwifeService.authenticated;
  }
}
