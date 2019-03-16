const moment = require('moment')

let generateMessage = (from,body) => {
    return {
        from,
        body,
        timestamp: moment().valueOf(),
    }
}
module.exports = {generateMessage}