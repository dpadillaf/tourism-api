const opinionCtrl = {};

const Opinion = require( '../models/Opinion' );

opinionCtrl.create = async ( req, res ) => {
    
    let { title, description, qualification, user, place } = req.body;
    
    let opinion = new Opinion( {
        title,
        description,
        qualification,
        user,
        place
    } );

    opinion.save( ( err, opinionDB ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            opinion: opinionDB
        } );

    } );

};

opinionCtrl.getByPlace = async ( req, res ) => {

    let { id } = req.params;

    Opinion.find( { place: id }, 'title description qualification' )
                .sort( '-created_at' )
                .populate( 'user', 'name' )
                .exec( ( err, opinions ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            opinions
        } );

    } );

};

opinionCtrl.getByUser = async ( req, res ) => {

    let { id } = req.params;

    Opinion.find( { user: id }, 'title description qualification' )
                .sort( 'created_at' )
                .populate( 'place', 'name city' )
                .populate( 'city', 'name' )
                .exec( ( err, opinions ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            opinions
        } );

    } );

};

opinionCtrl.getById = async ( req, res ) => {

    let { id } = req.params;

    Opinion.findById( id, 'title description qualification')
            .populate( 'user', 'name' )
            .populate( 'place', 'name' )
            .exec( ( err, opinionDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !opinionDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Opinión'
                }
            } );
        }

        return res.json( {
            ok: true,
            opinion: opinionDB
        } );

    } );

};

opinionCtrl.update = async ( req, res ) => {

    let { id } = req.params;
    let { title, description, qualification } = req.body;

    Opinion.findByIdAndUpdate( id, { title, description, qualification }, { new: true }, ( err, opinionDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !opinionDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Opinión'
                }
            } );
        }

        return res.json( {
            ok: true,
            opinion: opinionDB
        } );

    } );

};

opinionCtrl.remove = async ( req, res ) => {

    let { id } = req.params;
    let userId = req.user._id;

    Opinion.deleteOne( { _id: id, user: userId }, ( err, opinionDeleted ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !opinionDeleted ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Opinión'
                }
            } );
        }

        return res.json( {
            ok: true,
            opinion: opinionDeleted
        } );

    } );

};

module.exports = opinionCtrl;