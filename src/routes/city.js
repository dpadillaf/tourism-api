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
    update,
    remove
} = require( '../controllers/city.controller' );

//Routes
router.get( '/cities', getAll );

router.get( '/cities/:id', getByDepartment );

router.get( '/city/:id', getById );

router.post( '/city', [ verifyToken, verifyAdmin_Role ], create );

router.put( '/city/:id', [ verifyToken, verifyAdmin_Role ], update );

router.delete( '/city/:id', [ verifyToken, verifyAdmin_Role ], remove );

module.exports = router;