import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Router }            from '@angular/router';

import { Hero }        from './hero';
import { HeroService } from './hero.service';
import { Booking }from './booking';

@Component({
  selector: 'hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: [ './hero-form.component.css' ]
})
export class HeroFormComponent {
  hero: Hero;
  model= new Booking(1, '', '', '' , '', '', '', '');

  Date:string=''; //不知道發生甚麼事 唯有model.date無法去做儲存 所以在HTML使用此變數儲存

  seats:Array<any>;
  current_x:number;
  current_y:number;
  flag:boolean=false;

  noise:string;
  submitted = false;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.route.params
        .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        .subscribe(hero => this.hero = hero);

      this.seats=[
        // x:9
        [false,false,false,false,false,false,false,false,false,false], // y:6
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false,false]
      ];
  }



  add(movieName:string,date:string,time:string,seat:string,name: string, number:string, email:string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.createBooking(movieName,date,time,seat,name,number,email)
      .then(booking => {
        this.model=booking;
      });

      let link = ['/dashboard'];
      this.router.navigate(link);
  }

  select(x:number, y:number){

      if(this.seats[y][x] ==false && this.flag==false){
        this.seats[y][x] = true;
        this.current_x=x;
        this.current_y=y;
        this.flag=true;
        this.setSeat(x,y);
      }
      else{
        this.seats[this.current_y][this.current_x] = false;
        this.seats[y][x] = true;
        this.current_x=x;
        this.current_y=y;
        this.setSeat(x,y);
      }
  }

  setSeat(x:number, y:number): void{

    switch(y)
    {
      case 1:
        this.model.seat='A';
        break;
      case 2:
        this.model.seat='B';
        break;
      case 3:
        this.model.seat='C';
        break;
      case 4:
        this.model.seat='D';
        break;
      case 5:
        this.model.seat='E';
        break;
      case 6:
        this.model.seat='F';
        break;
    }
    this.model.seat+=x;

  }

  onSubmit() {
    this.noise='未選擇您的座位!';
    this.submitted = true&&this.flag;
  }

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: any) {
    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }

  /////////////////////////////

}
