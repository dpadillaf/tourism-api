const router = require( 'express' ).Router();

const {
    signIn,
    logIn,
    logInGoogle
} = require( '../controllers/login.controller' );

//Routes
router.post( '/signin', signIn );

router.post( '/login', logIn );

router.post( '/google', logInGoogle );

module.exports = router;
  