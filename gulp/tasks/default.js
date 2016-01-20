'use strict';

let gulp = require('gulp');
let os          = require('os');
var qrcode      = require('qrcode-terminal');

let getIp = () => {
  let ifaces = os.networkInterfaces();
  return Object.keys(ifaces)
    .map(ifname => ifaces[ifname])
    .reduce((iface) => {
      return iface.filter(face => face.family === 'IPv4' && !face.internal);
    });
}

gulp.task('default', ['serve'], function() {
  let ip = getIp();
  if (ip) {
    if (Array.isArray(ip) && ip.length) {
      ip = ip[0];
    }
    qrcode.generate(`http://${ip.address}:3000`);
  }

  gulp.watch('./src/sass/**/*.scss', ['sass']);
});
