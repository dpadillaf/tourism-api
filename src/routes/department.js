const router = require( 'express' ).Router();

const { 
    verifyToken, 
    verifyAdmin_Role 
} = require( '../middlewares/authenticator' );

const {
    create,
    getAll,
    getById,
    update
} = require( '../controllers/department.controller' );

//Routes
router.get( '/department', [ verifyToken, verifyAdmin_Role ], getAll );

router.get( '/department/:id', [ verifyToken, verifyAdmin_Role ], getById );

router.post( '/department', [ verifyToken, verifyAdmin_Role ], create );

router.put( '/department/:id', [ verifyToken, verifyAdmin_Role ], update );

module.exports = router;