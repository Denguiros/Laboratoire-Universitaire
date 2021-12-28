import { OutilFormComponent } from './outil-form/outil-form.component';
import { OutilsShowComponent } from './outils-show/outils-show.component';
import { EvenementShowComponent } from './evenement-show/evenement-show.component';
import { Routes } from '@angular/router';
import {MembersComponent} from "./members/members.component";
import {MemberFormComponent} from "./member-form/member-form.component";
import {EvenementsComponent} from "./evenements/evenements.component";
import {PublicationFormComponent} from "./publication-form/publication-form.component";
import {PublicationsComponent} from "./publications/publications.component";
import {EvenementFormComponent} from "./evenement-form/evenement-form.component";
import { ProfileComponent } from './profile/profile.component';
import { MemberShowComponent } from './member-show/member-show.component';
import {OutilsComponent} from "./outils/outils.component";



export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [

      {
        path: 'members',
        component: MembersComponent
      },
      {
        path: 'member-form',
        component: MemberFormComponent
      },
      {
        path: 'member-show/:id',
        component: MemberShowComponent
      },
      {
        path: 'member-form/:id/edit',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: 'evenements',
        component: EvenementsComponent
      },

      {
        path: 'evenement-form',
        component: EvenementFormComponent
      },
      {
        path: 'evenment-show/:id',
        component:  EvenementShowComponent
      },
      {
        path: 'outils',
        component: OutilsComponent
      },
      {
        path: 'outils-show/:id',
        component: OutilsShowComponent
      },      {
        path: 'outil-form',
        component: OutilFormComponent
      },
      {
        path: 'publications',
        component: PublicationsComponent
      },
      {
        path: 'publication-form',
        component: PublicationFormComponent
      },
	    {
        path: 'profile',
        component: ProfileComponent
      },

		]
	}
];
