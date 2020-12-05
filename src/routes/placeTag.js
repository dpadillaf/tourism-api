const router = require( 'express' ).Router();

const { 
    verifyToken, 
    verifyAdmin_Role 
} = require( '../middlewares/authenticator' );

const {
    create,
    getByPlace,
    getById,
    remove
} = require( '../controllers/placeTag.controller' );

//Routes
router.get( '/placetags/:id', getByPlace );

router.get( '/placetag/:id', getById );

router.post( '/placetag', [ verifyToken, verifyAdmin_Role ], create );

router.delete( '/placetag/:id', [ verifyToken, verifyAdmin_Role ], remove );

module.exports = router;