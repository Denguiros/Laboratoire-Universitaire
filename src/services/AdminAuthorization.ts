import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";


@Injectable({
  providedIn: 'root',
})
export class AdminAuthorization implements CanActivate {
  loggedInUser: any;

  constructor(public router: Router) {
    if (localStorage.getItem("user") !== '') {
      // @ts-ignore
      this.loggedInUser = JSON.parse(localStorage.getItem("user"));
    } else {
      this.loggedInUser = null;
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.loggedInUser !== null) {
        if (this.loggedInUser.admin) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      } else {
        this.router.navigate(['/login']);
        resolve(false);
      }

    });
  }
}
