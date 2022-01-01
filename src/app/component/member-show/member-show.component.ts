import {Member} from './../../../models/member.model';
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
      this.memberService.getMemeberById(this.currentId).then((member) => {
          if (member.id != null) {
            this.member = member;
            this.memberService.getUserPhoto(this.member.photo).then((photo) => {
              const reader = new FileReader();
              reader.readAsDataURL(photo);
              // @ts-ignore
              reader.onloadend = () => {

                // just putting the data url to img element
                // @ts-ignore
                document.querySelector('#image').src = reader.result ;
              }
              console.log(photo);
            });
            this.member.type = member.grade != null ? "Enseignant" : "Etudiant";
            if (this.member.email === this.loggedInUser.email) {
              this.canEdit = true;
            }
          } else {
            this.router.navigate(["/component/members"]);
          }
        }
      )
      ;
    }
  }
}

