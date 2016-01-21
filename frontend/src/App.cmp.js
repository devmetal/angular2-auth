'use strict';

import {
  Component
} from 'angular2/core';

import {
  ROUTE_DIRECTIVES,
  RouteConfig,
  Router
} from 'angular2/router';

@Component({
  selector: 'app',
  directives:[ROUTE_DIRECTIVES],
  template:`
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  {path: '/home',  name: 'home',  component: Home},
  {path: '/login', name: 'login', component: Login}
])
export class App {
  constructor(router: Router) {
    this.router = router;
    router.navigate('/home');
  }
}
