const router = require( 'express' ).Router();

const { 
    verifyToken, 
    verifyAdmin_Role 
} = require( '../middlewares/authenticator' );

const {
    create,
    getAll,
    getByDepartment,
    getById,
    update
} = require( '../controllers/city.controller' );

//Routes
router.get( '/cities', [ verifyToken, verifyAdmin_Role ], getAll );

router.get( '/cities/:id', [ verifyToken, verifyAdmin_Role ], getByDepartment );

router.get( '/city/:id', [ verifyToken, verifyAdmin_Role ], getById );

router.post( '/city', [ verifyToken, verifyAdmin_Role ], create );

router.put( '/city/:id', [ verifyToken, verifyAdmin_Role ], update );

module.exports = router;