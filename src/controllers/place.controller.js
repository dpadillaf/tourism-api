const placeCtrl = {};

const Place = require( '../models/Place' );

placeCtrl.create = async ( req, res ) => {
    
    let { 
        name, 
        description, 
        history,
        schedule,
        contact,
        whatsapp,
        latitude,
        longitude,
        department,
        city
    } = req.body;
    
    let place = new Place( {
        name, 
        description, 
        history,
        schedule,
        contact,
        whatsapp,
        latitude,
        longitude,
        department,
        city
    } );

    place.save( ( err, placeDB ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            place: placeDB
        } );

    } );

};

placeCtrl.getByCity = async ( req, res ) => {

    let { id } = req.params;

    Place.find( { city: id }, 'name description schedule whatsapp state latitude longitude' )
                .sort( 'name' )
                .exec( ( err, places ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            places
        } );

    } );

};

placeCtrl.getById = async ( req, res ) => {

    let { id } = req.params;

    Place.findById( id )
            .populate( 'department', 'name' )
            .populate( 'city', 'name' )
            .exec( ( err, placeDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !placeDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Sitio'
                }
            } );
        }

        return res.json( {
            ok: true,
            place: placeDB
        } );

    } );

};

placeCtrl.update = async ( req, res ) => {

    let { id } = req.params;
    let { 
        name, 
        description, 
        history,
        schedule,
        contact,
        whatsapp,
        latitude,
        longitude,
        department,
        city,
        state
    } = req.body;

    Place.findByIdAndUpdate( id, { 
        name, 
        description, 
        history,
        schedule,
        contact,
        whatsapp,
        latitude,
        longitude,
        department,
        city,
        state
     }, { new: true }, ( err, placeDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !placeDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Lugar'
                }
            } );
        }

        return res.json( {
            ok: true,
            place: placeDB
        } );

    } );

};

placeCtrl.remove = async ( req, res ) => {

    let { id } = req.params;

    Place.findByIdAndRemove( id, ( err, placeDeleted ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !placeDeleted ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Sitio'
                }
            } );
        }

        return res.json( {
            ok: true,
            place: placeDeleted
        } );

    } );

};

module.exports = placeCtrl;