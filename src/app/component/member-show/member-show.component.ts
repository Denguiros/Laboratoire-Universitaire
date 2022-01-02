import {Member} from '../../../models/member.model';
import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-member-show',
  templateUrl: './member-show.component.html',
  styleUrls: ['./member-show.component.scss']
})
export class MemberShowComponent implements OnInit {
  member = {} as Member;
  canEdit = false;
  photo = {};
  // @ts-ignore
  loggedInUser = JSON.parse(localStorage.getItem("user"));

  constructor(private memberService: MemberService, private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  currentId = '';

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.memberService.getMemberById(this.currentId).then((member) => {
        if (member.id != null) {
          this.member = member;
          if (member.photo != null) {
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
          if (member.cv != null) {
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
          if (this.member.email === this.loggedInUser.email) {
            this.canEdit = true;
          }
        }
        else {
          this.router.navigate(["/component/members"]);
        }
      });
    } else {
      this.router.navigate(["/component/members"]);
    }
  }
}


