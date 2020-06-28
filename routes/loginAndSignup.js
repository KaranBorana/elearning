var express = require('express');
const { User } = require('../db/models/user.model');
const { verifySession } = require('../middleware/verifySession');
var router = express.Router();

// *** USER ROUTES ***

/**
 * POST /users
 * Purpose: SignUp
 */
router.post('/signup', function (req, res, next) {
  // User signs up
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully. refreshToken returned.
        // Now we generate an access auth token for the user.

        return newUser.generateAccessAuthToken().then((accessToken) => {
           // access auth token generated successfully.
           // now we return an object containing the auth token
            return { accessToken, refreshToken };
        });
    }).then((authTokens) => {
        /**
         * Now we construct and send the response to the user with their
         * auth tokens in the header and the user object in the body
         */
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
});


/**
 * POST /users/login
 * Purpose: Login 
 */
router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully. refreshToken returned.
            // Now we generate an access auth token for the user.

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully.
                // now we return an object containing the auth token
                return { accessToken, refreshToken };
            })
        }).then((authTokens) => {
             /**
             * Now we construct and send the response to the user with their
             * auth tokens in the header and the user object in the body
             */
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).status(e);
    })
});


/**
 * GET /users/me/access-token
 * Purpose: Generates and returns an access token
 */
router.get('/users/me/access-token', verifySession, (req, res) => {
    // Now we know that user is authenticated and we have
    // the user_id and user object available with us.
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e); 
    });
});

module.exports = router;
