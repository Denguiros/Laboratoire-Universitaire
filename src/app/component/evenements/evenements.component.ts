import {Component, OnDestroy, OnInit} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {Evenement} from "../../../models/evenement.model";
import {EvenementService} from "../../../services/evenement.service";
import {Subject} from "rxjs"; // useful for typechecking
@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit,OnDestroy {
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
  evenements:Evenement[] =[];
  dtTrigger: Subject<any> = new Subject<any>();
  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    initialDate: Date.now(),
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events: [
      { title: 'event 1', date: '2021-12-01' },
      { title: 'event 2', date: '2021-12-02' }
    ],
  };

  constructor(private evenementService:EvenementService) { }

  ngOnInit(): void {
    this.getAllEvenements();

  }

  getAllEvenements() {
    this.evenementService.getAllEvemenements().then((evenements)=>{
      this.evenements=evenements;
      this.dtTrigger.next();
    });
  }

  onRemove(id: string) {
    this.evenementService.deleteEvenementById(id).then(() => {
      this.evenementService.getAllEvemenements().then((evenements) => {
        this.evenements = evenements;
      });
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
