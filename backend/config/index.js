var config;

if (false && process.env.NODE_ENV === 'production') {
    config = require('./prod')
} else {
    config = require('./prod')

}

module.exports = config