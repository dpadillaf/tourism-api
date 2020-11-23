const loginCtrl = {};

const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const { OAuth2Client } = require( 'google-auth-library' );

const client = new OAuth2Client( process.env.CLIENT_ID );

const User = require( '../models/User' );

loginCtrl.signIn = async ( req, res ) => {
    
    let body = req.body;
    
    let user = new User( {
        name: body.name,
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

        let token = jwt.sign( {
            user: usrDB
        }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN } );

        res.json( {
            ok: true,
            user: usrDB,
            token
        } );

    } );

};

loginCtrl.logIn = async ( req, res ) => {
    
    let body = req.body;
    
    User.findOne( { email: body.email, state: true }, ( err, usrDB ) => {

        if ( err ){
            return res.status( 500 ).json( {
                ok: false,
                err
            } );
        }

        if ( !usrDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'email* or password wrong'
                }
            } );
        }

        if ( !bcrypt.compareSync( body.password, usrDB.password ) ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'email or password* wrong'
                }
            } );
        }

        let token = jwt.sign( {
            user: usrDB
        }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN } );

        res.json( {
            ok: true,
            usuario: usrDB,
            token
        } );

    } );

};

//config google
async function verify( token ) {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend

    });

    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        google: true
    }
    
}

loginCtrl.logInGoogle = async ( req, res ) => {

    let token = req.body.idtoken;

    let googleUser = await verify( token )
        .catch( e => {
            return res.status( 403 ).json( {
                ok: false,
                err: e
            } );
        } );

    User.findOne( { email: googleUser.email, state: true }, ( err, usrDB ) => {

        if ( err ) {
            return res.status( 500 ).json( {
                ok: false,
                err
            } );
        }

        if ( usrDB ) {

            if ( usrDB.google === false ) {
                return res.status( 400 ).json( {
                    ok: false,
                    err: 'Debe usar autenticación normal'
                } );
            } else {
                let token = jwt.sign( {
                    user: usrDB
                }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN } );

                return res.json( {
                    ok: true,
                    user: usrDB,
                    token
                } );
            }

        } else {

            // si nuevo user no existe en BD
            let user = new User();

            user.name = googleUser.name;
            user.email = googleUser.email;
            user.google = true;
            user.password = ':=)';

            user.save( ( err, usrDB ) => {

                if ( err ) {
                    return res.status( 500 ).json( {
                        ok: false,
                        err
                    } );
                }

                let token = jwt.sign( {
                    user: usrDB
                }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN } );

                return res.json( {
                    ok: true,
                    user: usrDB,
                    token
                } );

            } );

        }

    } );

};

module.exports = loginCtrl;