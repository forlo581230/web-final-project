import { Component }          from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">現正熱映</a>
      <a routerLink="/search" routerLinkActive="active">查詢訂票</a>
    </nav>
    <div class=navbar></div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '英雄電影院';
}
