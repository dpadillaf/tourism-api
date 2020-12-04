const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

let placeTagSchema = new Schema( {
    tag: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
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

module.exports = mongoose.model( 'PlaceTag', placeTagSchema );