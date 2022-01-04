import {Component, OnDestroy, OnInit} from '@angular/core';
import {CalendarOptions} from '@fullcalendar/angular';
import {Evenement} from "../../../models/evenement.model";
import {EvenementService} from "../../../services/evenement.service";
import {Subject} from "rxjs"; // useful for typechecking
@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.scss']
})
export class EvenementsComponent implements OnInit, OnDestroy {
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
  evenements: Evenement[] = [];
  calendarEvents = [];
  dtTrigger: Subject<any> = new Subject<any>();
  public calendarOptions: CalendarOptions = {};

  constructor(private evenementService: EvenementService) {
  }

  ngOnInit(): void {
    this.getAllEvenements();

  }

  getAllEvenements() {
    this.evenementService.getAllEvemenements().then((evenements) => {
      this.evenements = evenements;
      this.evenements.forEach(ev => {
        const newEvent = {
          title: ev.titre,
          start: ev.date,
          url:"/component/evenement-show/"+ev.id
        };
        // @ts-ignore
        this.calendarEvents.push(newEvent)
      });
      setTimeout(() => {
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          initialDate: Date.now(),
          navLinks: true, // can click day/week names to navigate views
          dayMaxEvents: true, // allow "more" link when too many events
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          },
          events: this.calendarEvents
        }
      }, 100);
    })
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
