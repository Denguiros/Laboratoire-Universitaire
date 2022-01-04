import {Publication} from "./publication.model";
import {Evenement} from "./evenement.model";
import {Outil} from "./outil.member";

export interface Member {
  id: string;
  admin:string;
  cin: string;
  nom: string;
  prenom: string;
  type: string;
  cv: string;
  photo:string;
  email:string;
  date:string;
  dateInscription: string;
  diplome: string;
  encadreur:string;
  grade: string;
  etablissement: string;
  publications:Publication[];
  evenements:Evenement[];
  outils:Outil[];
}
