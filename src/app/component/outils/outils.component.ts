import { Outil } from './../../../models/outil.member';
import { OutilService } from './../../../services/outil.service';
import { Subject } from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-outils',
  templateUrl: './outils.component.html',
  styleUrls: ['./outils.component.scss']
})
export class OutilsComponent implements OnInit ,OnDestroy{
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
  outils: Outil[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  loggedInUserIsAdmin : boolean = false;
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllOutils();
    if(this.loggedInUser != null)
    {
      if (this.loggedInUser.admin)
      {
        this.loggedInUserIsAdmin = true;
      }
    }
  }

  getAllOutils() {
    this.outilService.getAllOutils().then((outils) => {
      this.outils = outils;
      this.dtTrigger.next();
    });
  }
  onRemove(id: string) {
    this.outilService.deleteOutilById(id).then(() => {
      this.outilService.getAllOutils().then((outils) => {
        this.outils = outils;
      });
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  constructor(
    private outilService: OutilService
  ) {}

}
