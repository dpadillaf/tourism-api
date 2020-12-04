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
} = require( '../controllers/department.controller' );

//Routes
router.get( '/department', getAll );

router.get( '/department/:id', getById );

router.post( '/department', [ verifyToken, verifyAdmin_Role ], create );

router.put( '/department/:id', [ verifyToken, verifyAdmin_Role ], update );

router.delete( '/department/:id', [ verifyToken, verifyAdmin_Role ], remove );

module.exports = router;