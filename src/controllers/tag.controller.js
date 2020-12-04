const tagCtrl = {};

const Tag = require( '../models/Tag' );

tagCtrl.create = async ( req, res ) => {
    
    let { name } = req.body;
    
    let tag = new Tag( {
        name
    } );

    tag.save( ( err, tagDB ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            tag: tagDB
        } );

    } );

};

tagCtrl.getAll = async ( req, res ) => {

    Tag.find( {}, 'name state' )
                .sort( 'name' )
                .exec( ( err, tags ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            tags
        } );

    } );

};

tagCtrl.getById = async ( req, res ) => {

    let { id } = req.params;

    Tag.findById( id, 'name state', ( err, tagDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !tagDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Tag'
                }
            } );
        }

        return res.json( {
            ok: true,
            tag: tagDB
        } );

    } );

};

tagCtrl.update = async ( req, res ) => {

    let { id } = req.params;
    let { state, name } = req.body;

    Tag.findByIdAndUpdate( id, { state, name }, { new: true }, ( err, tagDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !tagDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Tag'
                }
            } );
        }

        return res.json( {
            ok: true,
            tag: tagDB
        } );

    } );

};

tagCtrl.remove = async ( req, res ) => {

    let { id } = req.params;

    Tag.deleteOne( { _id: id }, ( err, tagDeleted ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !tagDeleted ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Tag'
                }
            } );
        }

        return res.json( {
            ok: true,
            tag: tagDeleted
        } );

    } );

};

module.exports = tagCtrl;