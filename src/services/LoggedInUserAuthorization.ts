import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";


@Injectable({
  providedIn: 'root',
})
export class LoggedInUserAuthorization implements CanActivate {
  // @ts-ignore
  loggedInUser = JSON.parse(localStorage.getItem("user"));
  constructor(public router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
        if(this.loggedInUser != null)
        {
          resolve(true);
        }
        else
        {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    }
}
