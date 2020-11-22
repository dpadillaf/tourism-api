/**
 * authenticate token
 */
const jwt = require( 'jsonwebtoken' );

 let verifyToken = ( req, res, next ) => {

    let token = req.get( 'token' );

    jwt.verify( token, process.env.SEED, ( err, decoded ) => {

        if ( err ){
            return res.status( 401 ).json( {
                ok: false,
                err
            } );
        }

        req.user = decoded.user;
        next();

    } );

 };

 /**
  * Verify ADMIN_ROLE
  */
 let verifyAdmin_Role = ( req, res, next ) => {

    let role = req.user.role;

    if ( role === 'ADMIN_ROLE' ) {
        next();
    }else{
        return res.status( 400 ).json( {
            ok: false,
            err: {
                message: 'Usuario no autorizado!'
            }
        } );
    }

 }

 /**
  * Verify ADMIN_ROLE & MUNICIPALITY_ADMIN_ROLE
  */
 let verifyMunicipality_Admin_Role = ( req, res, next ) => {

    let role = req.user.role;

    if ( role === 'ADMIN_ROLE' || role === 'MUNICIPALITY_ADMIN_ROLE' ) {
        next();
    }else{
        return res.status( 400 ).json( {
            ok: false,
            err: {
                message: 'Usuario no autorizado!'
            }
        } );
    }

 }

 /**
  * Verify ADMIN_ROLE & MUNICIPALITY_ADMIN_ROLE & SITE_ADMIN_ROLE
  */
 let verifySite_Municipality_Admin_Role = ( req, res, next ) => {

    let role = req.user.role;

    if ( role === 'ADMIN_ROLE' || role === 'MUNICIPALITY_ADMIN_ROLE' || role === 'SITE_ADMIN_ROLE' ) {
        next();
    }else{
        return res.status( 400 ).json( {
            ok: false,
            err: {
                message: 'Usuario no autorizado!'
            }
        } );
    }

 }

 module.exports = {
        verifyToken,
        verifyAdmin_Role,
        verifyMunicipality_Admin_Role,
        verifySite_Municipality_Admin_Role
 }