const { auth } = require('express-oauth2-jwt-bearer');
const dotenv = require('dotenv');

dotenv.config();

const issuerBaseURL = "https://dev-447p4bv1gsmeqfqv.us.auth0.com";
const audeience = "https://weather-api.fidenz.com";

const checkJwt = auth({
    audience: audeience,
    issuerBaseURL: issuerBaseURL,
    tokenSigningAlg: 'RS256',
})

module.exports = checkJwt;