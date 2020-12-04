const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

let placeSchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ]
    },
    description: String,
    history: String,
    schedule: String,
    contact: String,
    whatsapp: String,
    latitude: Number,
    longitude: Number,
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
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

module.exports = mongoose.model( 'Place', placeSchema );