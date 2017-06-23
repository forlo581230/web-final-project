import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import {Detail} from './detail';
import {Booking} from './booking';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'api/heroes';  // URL to web api
  private detailsUrl = 'api/details';  // URL to web api
  private bookingsUrl = 'api/bookings';  // URL to web api

  constructor(private http: Http) { }

  createBooking(movieName:string,date:string,time:string,seat:string,name: string, number:string, email:string): Promise<Booking> {
    return this.http
      .post(this.bookingsUrl, JSON.stringify({movieName:movieName,date:date,time:time,seat:seat,name: name, number:number, email:email}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Booking)
      .catch(this.handleError);
  }


  getDetails(): Promise<Detail[]> {
    return this.http.get(this.detailsUrl)
               .toPromise()
               .then(response => response.json().data as Detail[])
               .catch(this.handleError);
  }



  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }


  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
