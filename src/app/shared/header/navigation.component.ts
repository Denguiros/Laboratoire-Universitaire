import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {AuthService} from "../../../services/AuthService";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  // tslint:disable-next-line:no-non-null-assertion
  loggedInUser = JSON.parse(localStorage.getItem('user')!)
  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  constructor(private modalService: NgbModal,private authService: AuthService,private router: Router) {
  }
  loggout(): void {
    localStorage.setItem('user', '');
    this.authService.doLogout().then(() => this.router.navigate(['/login']));
  }

  ngAfterViewInit() { }
}
