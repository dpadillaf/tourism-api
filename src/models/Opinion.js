const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

let opinionSchema = new Schema( {
    title: {
        type: String,
        max: 50,
        required: [ true, 'El campo título es requerido' ]
    },
    description: String,
    qualification: {
        type: Number,
        min: 1,
        max: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place'
    },
    created_at: { 
        type: Date, 
        default: Date.now() 
    }
} );

module.exports = mongoose.model( 'Opinion', opinionSchema );