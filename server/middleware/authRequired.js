const { auth } = require('express-oauth2-jwt-bearer');
const dotenv = require('dotenv');

dotenv.config();

const issuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE;

console.log('Auth0 Config:', {
    issuerBaseURL,
    audience,
});

const checkJwt = auth({
    audience: audience,
    issuerBaseURL: issuerBaseURL,
    tokenSigningAlg: 'RS256',
});

// Add custom error handler middleware
const authErrorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.error('JWT Validation Error:', {
            message: err.message,
            code: err.code,
            status: err.status
        });
        return res.status(401).json({ 
            error: 'Unauthorized', 
            message: err.message 
        });
    }
    next(err);
};

module.exports = { checkJwt, authErrorHandler };