const router = require( 'express' ).Router();

const { 
    verifyToken
} = require( '../middlewares/authenticator' );

const {
    create,
    getByPlace,
    getByUser,
    getById,
    update,
    remove
} = require( '../controllers/opinion.controller' );

//Routes
router.get( '/opinionsbyplace/:id', getByPlace );

router.get( '/opinionsbyuser/:id', getByUser );

router.get( '/opinion/:id', getById );

router.post( '/opinion', verifyToken, create );

router.put( '/opinion/:id', verifyToken, update );

router.delete( '/opinion/:id', verifyToken, remove );

module.exports = router;