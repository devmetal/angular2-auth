'use strict';

import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
import 'babel-polyfill';

import { App }              from './src/App.cmp';
import { bootstrap }        from 'angular2/bootstrap';
import { bind }             from 'angular2/core';
import { ROUTER_PROVIDERS } from 'angular2/router';

bootstrap(App, [
  ROUTER_PROVIDERS
]);
