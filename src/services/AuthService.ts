import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {Observable, Subject} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";


@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  public userClaims: any;
  public userClaims$ = new Subject<any>();

  constructor(public afAuth: AngularFireAuth, public router: Router) {
  }

  getUserClaims(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (!!user) {
          this.setUserClaims(user);
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  getUserToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (!!user) {
          user
            .getIdToken()
            .then((token) => resolve(token))
            .catch(() => reject('No token Available.'));
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  setUserClaims(user: any): void {
    this.userClaims = user;
    this.userClaims$.next(user);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          console.log('User is not logged in');
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }

  // doFacebookLogin(): Promise<any> {
  //     return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  // }
  //
  // doTwitterLogin(): Promise<any> {
  //     return this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  // }

  doGoogleLogin(): Promise<any> {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  doLogout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!!this.afAuth.currentUser) {
        this.afAuth.signOut().then(
          () => {
            this.setUserClaims(null);
            resolve();
          },
          (err) => reject(err)
        );
      } else {
        reject();
      }
    });
  }
}
