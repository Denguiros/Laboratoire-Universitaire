import {Evenement} from './../../../models/evenement.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EvenementService} from "../../../services/evenement.service";
import {Subject} from "rxjs";
import {MemberService} from "../../../services/member.service";
import {Member} from "../../../models/member.model";

@Component({
  selector: 'app-evenement-show',
  templateUrl: './evenement-show.component.html',
  styleUrls: ['./evenement-show.component.scss']
})
export class EvenementShowComponent implements OnInit,OnDestroy {

  evenement: Evenement = {} as Evenement;
  participation = "Participer";
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
  canEdit = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  participants = [] as Member[];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute, private evenementService: EvenementService,private memberService:MemberService) {
  }

  currentId = '';
  getAllParticipants() {
    this.memberService.getAllEventParticipants(this.evenement.id).then((members) => {
      this.participants = members;
      console.log(members);
      this.participants.forEach((participant) => {
        if(participant.id === this.loggedInUser.id)
        {
          this.participation = "Ne plus participer";
        }
        if (participant.photo !== '') {
          this.memberService.getUserFile(participant.photo).then((photo) => {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            // @ts-ignore
            reader.onloadend = () => {
              // @ts-ignore
              document.querySelector('#image' + participant.id).src = reader.result;
            }
          });
        }
      })
      this.dtTrigger.next();
    });
  }
  updateParticipation() {
    if (this.participation === "Participer") {
      this.evenementService.affecterEvenementAMembre(this.evenement.id, this.loggedInUser.id).then(() => {
        this.memberService.getAllEventParticipants(this.evenement.id).then((members) => {
          this.participants = members;

          this.participants.forEach((participant) => {
            if(participant.id === this.loggedInUser.id)
            {
              this.participation = "Ne plus participer";
            }
            if (participant.photo !== '') {
              this.memberService.getUserFile(participant.photo).then((photo) => {
                const reader = new FileReader();
                reader.readAsDataURL(photo);
                // @ts-ignore
                reader.onloadend = () => {
                  // @ts-ignore
                  document.querySelector('#image' + participant.id).src = reader.result;
                }
              });
            }
          })
        })
      })
    } else {
      this.evenementService.desaffecterEvenementDeMembre(this.evenement.id, this.loggedInUser.id).then(() => {
        this.memberService.getAllEventParticipants(this.evenement.id).then((members) => {
          this.participants = members;
          this.participation = "Participer";
          this.participants.forEach((participant) => {
            if (participant.photo !== '') {
              this.memberService.getUserFile(participant.photo).then((photo) => {
                const reader = new FileReader();
                reader.readAsDataURL(photo);
                // @ts-ignore
                reader.onloadend = () => {
                  // @ts-ignore
                  document.querySelector('#image' + participant.id).src = reader.result;
                }
              });
            }
          })
        })
      })
    }
  }
  ngOnInit(): void {

    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.evenementService.getEvemenementById(this.currentId).then((evenement) => {
        if (evenement.id != null) {
          this.evenement = evenement;
          this.getAllParticipants();
          if (this.loggedInUser.evenements.filter((ev:Evenement)=>ev.id === this.evenement.id).length>0) {
            this.canEdit = true;
          }
          console.log(this.canEdit);
        }
      })
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
