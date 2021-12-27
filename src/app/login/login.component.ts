import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AuthService} from "../../services/AuthService";
import {MemberService} from "../../services/member.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  userData: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private afAuth: AngularFireAuth,
    private memberService:MemberService
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        console.log(this.userData);
      } else {
        localStorage.setItem('user', '');
      }
    })


  }

  ngOnInit(): void { }

  tryGoogleLogin(): void {
    this.authService
      .doGoogleLogin()
      .then(() => this.successRedirect())
      .catch((error) => console.log(error))
      .finally(() => { });
  }

  successRedirect(): void {
    const memberInDb = this.memberService.getMemeberByEmail(this.userData.email).then((member)=> {
      if(member.id == null)
      {

      }
    });

    this.ngZone.run(() => this.router.navigate(["/dashboard"]));
  }
}
