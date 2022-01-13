import {Component, OnInit} from '@angular/core';
import {PublicationService} from "../../../services/publication.service";
import {Publication} from "../../../models/publication.model";
import {Evenement} from "../../../models/evenement.model";
import {Outil} from "../../../models/outil.member";

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
  publications = [] as Publication[];
  term: string = "";
  canEdit = false;
  ownedPublications = [] as Publication[];
  constructor(private publicationService: PublicationService) {
  }

  ngOnInit(): void {
    this.getAllPublications();
  }

  getAllPublications() {
    this.publicationService.getAllPublications().then((publications) => {
      this.publications = publications;
      this.publications.forEach((publication) => {
        if (publication.photo !== '') {
          if(this.loggedInUser != null)
          {
            if(this.loggedInUser.publications.filter((pub: Publication)=>pub.id===publication.id).length>0)
            {

            this.ownedPublications.push(publication);
            }
          }
          this.publicationService.getPublicationFile(publication.photo).then((photo) => {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            // @ts-ignore
            reader.onloadend = () => {
              // @ts-ignore
              document.querySelector('#image' + publication.id).src = reader.result;
            }
          });
        }
        this.publicationService.getPublicationFile(publication.sourcePDF).then((pdf) => {
          const file = new Blob([pdf], {
            type: 'application/pdf'
          });
          // @ts-ignore
          document.querySelector('#source').href = URL.createObjectURL(file);
          // @ts-ignore
          document.querySelector('#source').download = 'publication.pdf';
        })
      })
    });
  }
  onChange(newValue:string)
  {
    this.getAllPublications();
  }

}
