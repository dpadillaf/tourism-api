const router = require( 'express' ).Router();

const {
    signIn
} = require( '../controllers/login.controller' );

//Routes
router.post( '/signin', signIn );

module.exports = router;
  