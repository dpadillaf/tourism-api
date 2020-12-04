const placeTagCtrl = {};

const PlaceTag = require( '../models/PlaceTag' );

placeTagCtrl.create = async ( req, res ) => {
    
    let { tag, place } = req.body;
    
    let placeTag = new PlaceTag( {
        tag,
        place
    } );

    placeTag.save( ( err, placeTagDB ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            placeTag: placeTagDB
        } );

    } );

};

placeTagCtrl.getByPlace = async ( req, res ) => {

    let { id } = req.params;

    PlaceTag.find( { place: id } )
                .populate( 'tag', 'name' )
                .exec( ( err, placeTags ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            placeTags
        } );

    } );

};

placeTagCtrl.getById = async ( req, res ) => {

    let { id } = req.params;

    PlaceTag.findById( id )
            .populate( 'tag', 'name' )
            .populate( 'place', 'name' )
            .exec( ( err, placeTagDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !placeTagDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Tag del Sitio'
                }
            } );
        }

        return res.json( {
            ok: true,
            placeTag: placeTagDB
        } );

    } );

};

placeTagCtrl.remove = async ( req, res ) => {

    let { id } = req.params;

    PlaceTag.findByIdAndRemove( id, ( err, placeTagDeleted ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !placeTagDeleted ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe tag del sitio'
                }
            } );
        }

        return res.json( {
            ok: true,
            placeTag: placeTagDeleted
        } );

    } );

};

module.exports = placeTagCtrl;