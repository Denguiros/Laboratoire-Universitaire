import { Outil } from './../../../models/outil.member';
import { OutilService } from './../../../services/outil.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outils',
  templateUrl: './outils.component.html',
  styleUrls: ['./outils.component.scss']
})
export class OutilsComponent implements OnInit {
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
  outils: Outil[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllMembers();
  }

  getAllMembers() {
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
