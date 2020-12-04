const router = require( 'express' ).Router();

const { 
    verifyToken, 
    verifyMunicipality_Admin_Role,
    verifySite_Municipality_Admin_Role 
} = require( '../middlewares/authenticator' );

const {
    create,
    getByCity,
    getById,
    update,
    remove
} = require( '../controllers/place.controller' );

//Routes
router.get( '/places/:id', getByCity );

router.get( '/place/:id', getById );

router.post( '/place', [ verifyToken, verifyMunicipality_Admin_Role ], create );

router.put( '/place/:id', [ verifyToken, verifySite_Municipality_Admin_Role ], update );

router.delete( '/place/:id', [ verifyToken, verifySite_Municipality_Admin_Role ], remove );

module.exports = router;