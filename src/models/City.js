const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

let citySchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ]
    },
    description: String,
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
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

module.exports = mongoose.model( 'City', citySchema );