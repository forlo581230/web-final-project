import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero }           from './hero';
import { Booking }           from './booking';

@Injectable()
export class HeroSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Booking[]> {
    return this.http
               .get(`app/bookings/?name=${term}`)
               .map(response => response.json().data as Booking[]);
  }
}
