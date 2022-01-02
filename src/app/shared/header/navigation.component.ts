import {Component, AfterViewInit, EventEmitter, Output, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {AuthService} from "../../../services/AuthService";
import {Router} from "@angular/router";
import {Member} from "../../../models/member.model";
import {MemberService} from "../../../services/member.service";

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
  loggedInUserIsAdmin: boolean = false;
  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  constructor(private modalService: NgbModal, private authService: AuthService, private router: Router,
              private memberService: MemberService) {
    if (this.loggedInUser == null) {
      this.authService.loggedInUser.subscribe(value => {
        this.loggedInUser = value;
        if (this.loggedInUser != null) {
          if (this.loggedInUser.photo != null) {
            this.memberService.getUserFile(this.loggedInUser.photo).then((photo) => {
              const reader = new FileReader();
              reader.readAsDataURL(photo);
              // @ts-ignore
              reader.onloadend = () => {
                // @ts-ignore
                document.querySelector('#img').src = reader.result;
              }
            });
          }
          if (this.loggedInUser.admin) {
            this.loggedInUserIsAdmin = true;
          }
        }
      });

    }
    if (this.loggedInUser != null) {
      if (this.loggedInUser.photo != null) {
        this.memberService.getUserFile(this.loggedInUser.photo).then((photo) => {
          const reader = new FileReader();
          reader.readAsDataURL(photo);
          // @ts-ignore
          reader.onloadend = () => {
            // @ts-ignore
            document.querySelector('#img').src = reader.result;
          }
        });
      }
      if (this.loggedInUser.admin) {
        this.loggedInUserIsAdmin = true;
      }
    }
  }

  loggout(): void {
    localStorage.setItem('user', '');
    this.authService.loggedInUser.next({} as Member);
    this.authService.doLogout().then(() => this.router.navigate(['/login']));
  }

  ngAfterViewInit() {
  }

}
