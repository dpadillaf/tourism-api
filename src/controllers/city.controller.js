const cityCtrl = {};

const City = require( '../models/City' );

cityCtrl.create = async ( req, res ) => {
    
    let { name, description, department } = req.body;
    
    let city = new City( {
        name,
        description,
        department
    } );

    city.save( ( err, cityDB ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            city: cityDB
        } );

    } );

};

cityCtrl.getAll = async ( req, res ) => {

    City.find( {}, 'name description state' )
                .sort( 'name' )
                .populate( 'department', 'name' )
                .exec( ( err, cities ) => {

                    if ( err ){
                        return res.status( 400 ).json( {
                            ok: false,
                            err
                        } );
                    }
            
                    return res.json( {
                        ok: true,
                        cities
                    } );
            
                } );

};

cityCtrl.getByDepartment = async ( req, res ) => {

    let { id } = req.params;

    City.find( { department: id }, 'name description state' )
                .sort( 'name' )
                .populate( 'department', 'name' )
                .exec( ( err, cities ) => {

                    if ( err ){
                        return res.status( 400 ).json( {
                            ok: false,
                            err
                        } );
                    }
            
                    return res.json( {
                        ok: true,
                        cities
                    } );
            
                } );

};

cityCtrl.getById = async ( req, res ) => {

    let { id } = req.params;

    City.findById( id, 'name description state')
            .populate( 'department', 'name' )
            .exec( ( err, cityDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            city: cityDB
        } );

    } );

};

cityCtrl.update = async ( req, res ) => {

    let { id } = req.params;
    let { state, name, description, department } = req.body;

    City.findByIdAndUpdate( id, { state, name, description, department }, { new: true }, ( err, cityDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !cityDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Ciudad'
                }
            } );
        }

        return res.json( {
            ok: true,
            city: cityDB
        } );

    } );

};

module.exports = cityCtrl;