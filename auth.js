function authtication(req, res, next) {
    console.log('Authenticating...');
    next();
}

module.exports = authtication;