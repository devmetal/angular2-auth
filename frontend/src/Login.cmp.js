'use strict';

import {
  Component
} from 'angular2/core';

import {
  Router
} from 'angular2/router';

@Component({
  selector: 'login',
  template: `
  `
})
export class Login {
  constructor(router: Router) {
    this.router = router;
  }

  login($event, username, password) {
    $event.preventDefault();

    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(status)
    .then(json)
    .then(response => {
      localStorage.setItem('jwt', response.token);
    })
    .catch(error => {
      
    })
  }
}
