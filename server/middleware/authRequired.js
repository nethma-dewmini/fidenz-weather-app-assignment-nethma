const { auth } = require('express-oauth2-jwt-bearer');
const dotenv = require('dotenv');

dotenv.config();

const issuerBaseURL = "https://dev-447p4bv1gsmeqfqv.us.auth0.com";
const audience = "https://weather-api.fidenz.com";

const checkJwt = auth({
    audience: audience,
    issuerBaseURL: issuerBaseURL,
    tokenSigningAlg: 'RS256',
})

module.exports = checkJwt;