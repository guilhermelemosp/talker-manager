const crypto = require('crypto');

const tokenGeneator = () => crypto.randomBytes(8).toString('hex');

module.exports = tokenGeneator;