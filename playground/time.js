const moment = require('moment');

let date = moment();
                        //full month name
console.log(date.format('MMMM'))
                        //shorthand month name
console.log(date.format('MMM'))
                        //month number
console.log(date.format('MMM Do, HH:mm:ss'))

date

setTimeout(() => {
    console.log(date.fromNow())
}, 60000)