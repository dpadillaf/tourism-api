const router = require( 'express' ).Router();

const { 
    verifyToken, 
    verifyAdmin_Role 
} = require( '../middlewares/authenticator' );

const {
    create,
    getAll,
    getById,
    update,
    remove
} = require( '../controllers/tag.controller' );

//Routes
router.get( '/tags', getAll );

router.get( '/tag/:id', getById );

router.post( '/tag', [ verifyToken, verifyAdmin_Role ], create );

router.put( '/tag/:id', [ verifyToken, verifyAdmin_Role ], update );

router.delete( '/tag/:id', [ verifyToken, verifyAdmin_Role ], remove );

module.exports = router;