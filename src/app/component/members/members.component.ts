import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from "../../../services/member.service";
import {Member} from "../../../models/member.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnDestroy, OnInit {
  members: Member[] = [];
  loggedInUser = {} as Member;
  loggedInUserIsAdmin : boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllMembers();
    // @ts-ignore
    this.loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
    if(this.loggedInUser != null)
    {
      if (this.loggedInUser.admin)
      {
        this.loggedInUserIsAdmin = true;
      }
    }
  }

  getAllMembers() {
    this.memberService.getAllMembers().then((members) => {
      this.members = members;
      this.members.forEach((member) => {
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
      this.dtTrigger.next();
    });
  }


  onRemove(id: string) {
    this.memberService.deleteMemberById(id).then(() => {
      this.memberService.getAllMembers().then((members) => {
        this.members = members;
        this.members.forEach((member) => {
          if (member.photo != null) {
            this.memberService.getUserFile(member.photo).then((photo) => {
              const reader = new FileReader();
              reader.readAsDataURL(photo);
              // @ts-ignore
              reader.onloadend = () => {

                // just putting the data url to img element
                // @ts-ignore
                document.querySelector('#image' + member.id).src = reader.result;
              }
            });
          }
        })
      });
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  constructor(
    private memberService: MemberService
  ) {
  }
}
