import {Component, OnInit} from '@angular/core';
import {Publication} from "../../../models/publication.model";
import {PublicationService} from "../../../services/publication.service";
import {Member} from "../../../models/member.model";
import {MemberService} from "../../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-publication-show',
  templateUrl: './publication-show.component.html',
  styleUrls: ['./publication-show.component.scss']
})
export class PublicationShowComponent implements OnInit {
  publication = {} as Publication
  canEdit = false;
  collaborateurs = [] as Member[];
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
  currentId = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private memberService: MemberService, private router: Router,
              private activatedRoute: ActivatedRoute, private publicationService: PublicationService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.publicationService.getPublicationById(this.currentId).then((pub) => {
        this.publication = pub;
        this.publicationService.getPublicationFile(pub.photo).then((photo) => {
          const reader = new FileReader();
          reader.readAsDataURL(photo);
          reader.onloadend = () => {
            // @ts-ignore
            document.querySelector('#image').src = reader.result;
          }
        });

        this.publicationService.getPublicationFile(pub.sourcePDF).then((pdf) => {
          const file = new Blob([pdf], {
            type: 'application/pdf'
          });
          // @ts-ignore
          document.querySelector('#source').href = URL.createObjectURL(file);
          // @ts-ignore
          document.querySelector('#source').download = 'publication.pdf';
        })
        this.memberService.getCollaborateursPublication(pub.id).then((members) => {
          this.collaborateurs = members;
          this.dtTrigger.next();
          if (this.loggedInUser != null) {
            if (this.collaborateurs.filter((collaboratuer) => collaboratuer.email === this.loggedInUser.email).length > 0) {
                this.canEdit=true;
            }
          }
          this.collaborateurs.forEach((member) => {
            if (member.photo !== "") {
              this.memberService.getUserFile(member.photo).then((photo) => {
                const reader = new FileReader();
                reader.readAsDataURL(photo);
                // @ts-ignore
                reader.onloadend = () => {

                  // just putting the data url to img element
                  // @ts-ignore
                  document.querySelector('#image' + member.id).src = reader.result;
                }
              })
            }
          });

        })
      })
    }
  }
  onRemove(id: string) {
    this.publicationService.deletePublication(id).then(() => {
      this.publicationService.desaffecterPublicationMembres(id).then(()=>{
        this.router.navigate(["/component/publications"]);
      })
    });
  }

}
