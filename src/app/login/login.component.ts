import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AuthService} from "../../services/AuthService";
import {MemberService} from "../../services/member.service";
import {Member} from "../../models/member.model";
import {SidebarComponent} from "../shared/sidebar/sidebar.component";

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
    private memberService: MemberService
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log("Logging in !");
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.memberService.getMemberByEmail(typeof user.email === "string" ? user.email : "").then((member) => {
          if (member == null) {
            console.log("New member logged in ... getting informations from google in progress..");
            const email = typeof user.email === "string" ? user.email : "";
            const newMembre = {
              type: "Etudiant",
              email,
              cv:"",
              photo:""
            } as Member
            // tslint:disable-next-line:no-shadowed-variable
            this.memberService.saveMember(newMembre).then((member) => {
              console.log("Member added to db");
            });
            // tslint:disable-next-line:no-shadowed-variable
            this.memberService.getMemberByEmail(email).then((member) => {
              localStorage.setItem("user", JSON.stringify(member));
              this.authService.loggedInUser.next(member);
            });
          } else {
            this.authService.loggedInUser.next(member);
            localStorage.setItem("user", JSON.stringify(member));
          }
        });
      } else {
        localStorage.setItem('user', '');
      }
    })

  }

  ngOnInit(): void {
  }

  tryGoogleLogin(): void {
    this.authService
      .doGoogleLogin()
      .then(() => this.successRedirect())
      .catch((error) => console.log(error))
      .finally(() => {
      });
  }

  successRedirect(): void {

    this.ngZone.run(() => this.router.navigate(["/component/members"]));
  }
}
