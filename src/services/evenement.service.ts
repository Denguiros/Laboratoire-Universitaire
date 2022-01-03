import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Evenement} from '../models/evenement.model'
@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  constructor(private httpClient: HttpClient) {
  }
}
