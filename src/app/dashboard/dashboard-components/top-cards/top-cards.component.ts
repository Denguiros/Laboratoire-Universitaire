import {Component, OnInit} from '@angular/core';
import {Member} from "../../../../models/member.model";
import {MemberService} from "../../../../services/member.service";
import {OutilService} from "../../../../services/outil.service";
import {EvenementService} from "../../../../services/evenement.service";
import {PublicationService} from "../../../../services/publication.service";

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})

export class TopCardsComponent implements OnInit {
  members: Member[] = [];
  NumberOfMembers = 0;
  NumberOfEvents = 0;
  NumberOfPublications = 0;
  NumberOfTools = 0;
  topcards = [] as CardData[];


  constructor(private memberService: MemberService,
              private evenementSerice: EvenementService,
              private outilService: OutilService, private publicationService: PublicationService) {

  }

  ngOnInit(): void {
    this.getNumberOfMembers()
  }

  getNumberOfMembers() {
    this.memberService.getAllMembers().then((members) => {
      this.members = members;
      this.NumberOfMembers = members.length
      this.topcards.push({
        bgcolor: 'success',
        icon: 'bi bi-person',
        title: this.NumberOfMembers.toString(),
        subtitle: 'Number of Members'
      })
    });
    this.evenementSerice.getAllEvemenements().then((event) => {
      this.NumberOfEvents = event.length
      this.topcards.push({
          bgcolor: 'warning',
          icon: 'bi bi-calendar2-event',
          title: this.NumberOfEvents.toString(),
          subtitle: 'Number of Events'
        }
      )
    })
    this.outilService.getAllOutils().then((outil) => {
      this.NumberOfTools = outil.length
      this.topcards.push({
          bgcolor: 'info',
          icon: 'bi bi-bag',
          title: this.NumberOfTools.toString(),
          subtitle: 'Number of Tools'
        }
      )
    });
    this.publicationService.getAllPublications().then((pub) => {
      console.log(pub)
      this.NumberOfPublications = pub.length
      this.topcards.push({
          bgcolor: 'danger',
          icon: 'bi bi-chat-square-dots',
          title: this.NumberOfPublications.toString(),
          subtitle: 'Number of Publications'
        }
      )
    });

  }

}

export interface CardData {
  bgcolor: string;
  icon: string;
  title: string;
  subtitle: string;
}
