const Rx = require('rxjs/Rx')

Rx.Observable
.interval(1000)
.subscribe(console.log)
