import {Component, AfterViewInit, OnInit} from '@angular/core';
import {ROUTES} from './menu-items';
import {RouteInfo} from './sidebar.metadata';
import {Router, ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../../services/AuthService";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
// @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
  loggedInUserIsAdmin: boolean = false;
  public sidebarnavItems: RouteInfo[] = [];

  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    if (this.loggedInUser == null) {
      this.authService.loggedInUser.subscribe(value => {
          this.loggedInUser = value;
        }
      )
    }
    if (this.loggedInUser.admin) {
      this.loggedInUserIsAdmin = true;
    }
    this.ngOnInit();
  };



// End open close
ngOnInit(): void {
  this.sidebarnavItems = ROUTES.filter(sidebarnavItem => {
    if (sidebarnavItem.title === "Dashboard" && !this.loggedInUserIsAdmin) {
      return;
    } else {
      return sidebarnavItem;
    }
  });
}


}
