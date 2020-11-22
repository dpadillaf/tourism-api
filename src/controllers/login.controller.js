const loginCtrl = {};

const bcrypt = require( 'bcrypt' );

const User = require( '../models/User' );

loginCtrl.signIn = async ( req, res ) => {
    
    let body = req.body;
    
    let user = new User( {
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 )
    } );

    user.save( ( err, usrDB ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        res.json( {
            ok: true,
            user: usrDB
        } );

    } );

};

module.exports = loginCtrl;