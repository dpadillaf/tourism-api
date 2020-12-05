const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

let departmentSchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ]
    },
    state: {
        type: Boolean,
        default: true
    },
    created_at: { 
        type: Date, 
        default: Date.now() 
    }
} );

module.exports = mongoose.model( 'Department', departmentSchema );