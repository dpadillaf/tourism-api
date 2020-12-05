const departmentCtrl = {};

const Department = require( '../models/Department' );

departmentCtrl.create = async ( req, res ) => {
    
    let { name } = req.body;
    
    let department = new Department( {
        name
    } );

    department.save( ( err, depDB ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            department: depDB
        } );

    } );

};

departmentCtrl.getAll = async ( req, res ) => {

    Department.find( {}, 'name state' )
                .sort( 'name' )
                .exec( ( err, departments ) => {

        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            departments
        } );

    } );

};

departmentCtrl.getById = async ( req, res ) => {

    let { id } = req.params;

    Department.findById( id, 'name state', ( err, depDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !depDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Departamento'
                }
            } );
        }

        return res.json( {
            ok: true,
            department: depDB
        } );

    } );

};

departmentCtrl.update = async ( req, res ) => {

    let { id } = req.params;
    let { state, name } = req.body;

    Department.findByIdAndUpdate( id, { state, name }, { new: true }, ( err, depDB ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !depDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Departamento'
                }
            } );
        }

        return res.json( {
            ok: true,
            department: depDB
        } );

    } );

};

departmentCtrl.remove = async ( req, res ) => {

    let { id } = req.params;

    Department.findByIdAndRemove( id, ( err, departmentDeleted ) => {
        
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        if ( !departmentDeleted ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe Departamento'
                }
            } );
        }

        return res.json( {
            ok: true,
            department: departmentDeleted
        } );

    } );

};

module.exports = departmentCtrl;