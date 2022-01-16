import {Member} from '../../../models/member.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from "../../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {Publication} from "../../../models/publication.model";
import {Outil} from "../../../models/outil.member";
import {Evenement} from "../../../models/evenement.model";
import {PublicationService} from "../../../services/publication.service";
import {OutilService} from "../../../services/outil.service";


@Component({
  selector: 'app-member-show',
  templateUrl: './member-show.component.html',
  styleUrls: ['./member-show.component.scss']
})
export class MemberShowComponent implements OnInit {
  member = {} as Member;
  canEdit = false;
  photo = {};
  etudiantsEncadrees = [] as Member[];
  publications = [] as Publication[];
  allOutils = [] as Outil[];
  outils = [] as Outil[];
  evenements = [] as Evenement[];
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;

  constructor(private memberService: MemberService, private router: Router,
              private activatedRoute: ActivatedRoute, private publicationService: PublicationService,
              private outilService:OutilService) {
  }

  currentId = '';

  ngOnInit(): void {

    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.memberService.getMemberById(this.currentId).then((member) => {
        if (member.id != null) {
          this.member = member;
          this.publications = member.publications;
          this.evenements = member.evenements;
          this.allOutils = member.outils;
          this.outils = this.allOutils.filter((out)=>String(out.open) === "true")
          this.outils.forEach((outi)=>{

            this.outilService.getOutilFile(outi.codeSource).then((codeSource) => {
              const file = new Blob([codeSource]);
              // @ts-ignore
              document.querySelector('#sourceOutil' + outi.id).href = URL.createObjectURL(file);
              // @ts-ignore
              document.querySelector('#sourceOutil' + outi.id).download = outi.nom+'.rar';
            })
          })
          if (member.photo !== '') {
            this.memberService.getUserFile(this.member.photo).then((photo) => {
              const reader = new FileReader();
              reader.readAsDataURL(photo);
              // @ts-ignore
              reader.onloadend = () => {
                // just putting the data url to img element
                // @ts-ignore
                document.querySelector('#image').src = reader.result;
              }
            });

          }
          if (member.cv !== '') {
            this.memberService.getUserFile(this.member.cv).then((cv) => {
              const file = new Blob([cv], {
                type: 'application/pdf'
              });
              // @ts-ignore
              document.querySelector('#cv').href = URL.createObjectURL(file);
              // @ts-ignore
              document.querySelector('#cv').download = 'cv.pdf';
            })
          }
          this.member.type = this.member.grade != null ? "Enseignant" : "Etudiant";
          if (this.loggedInUser != null) {

            if (this.member.email === this.loggedInUser.email) {
              this.canEdit = true;
              this.outils = this.allOutils;
            }
            this.outils.forEach((outi)=>{
              this.outilService.getOutilFile(outi.codeSource).then((codeSource) => {
                const file = new Blob([codeSource]);
                // @ts-ignore
                document.querySelector('#sourceOutil' + outi.id).href = URL.createObjectURL(file);
                // @ts-ignore
                document.querySelector('#sourceOutil' + outi.id).download = outi.nom+'.rar';
              })
            })
          }
          this.publications.forEach((publication) => {
            if (publication.photo !== '') {
              this.publicationService.getPublicationFile(publication.photo).then((photo) => {
                const reader = new FileReader();
                reader.readAsDataURL(photo);
                // @ts-ignore
                reader.onloadend = () => {
                  // @ts-ignore
                  document.querySelector('#pub' + publication.id).src = reader.result;
                }
              });
            }
            this.publicationService.getPublicationFile(publication.sourcePDF).then((pdf) => {
              const file = new Blob([pdf], {
                type: 'application/pdf'
              });
              // @ts-ignore
              document.querySelector('#source' + publication.id).href = URL.createObjectURL(file);
              // @ts-ignore
              document.querySelector('#source' + publication.id).download = 'publication.pdf';
            })
          })
          if (this.member.type === "Enseignant") {

            this.memberService.getEtudiantsDeEnseignant(this.currentId).then((members) => {
              this.etudiantsEncadrees = members;
              this.etudiantsEncadrees.forEach((member) => {
                if (member.photo !== '') {
                  this.memberService.getUserFile(member.photo).then((photo) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(photo);
                    // @ts-ignore
                    reader.onloadend = () => {
                      // @ts-ignore
                      document.querySelector('#image' + member.id).src = reader.result;
                    }
                  });
                }
              })
            });
          }
        } else {
          this.router.navigate(["/component/members"]);
        }
      });

    } else {
      this.router.navigate(["/component/members"]);
    }
  }
  onRemoveOutil(idMember: string,idOutil:string) {
    this.outilService.deleteOutilById(idOutil).then(() => {
      this.outilService.desaffecterOutilDeMembre(idMember,idOutil).then(()=>{
        this.allOutils = this.allOutils.filter((outil)=>outil.id !==idOutil);
      })
    });
  }
}


