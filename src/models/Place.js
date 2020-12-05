const mongoose = require( 'mongoose' );

const PlaceTag = require( '../models/PlaceTag' );

const Opinion = require( '../models/Opinion' );

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

placeSchema.pre('deleteOne', async function(next) { 
    // remove references when a tag is removed
    const doc = await this.model.findOne(this.getFilter());
    await PlaceTag.deleteMany( { place: doc._id } ).exec();
    await Opinion.deleteMany( { place: doc._id } ).exec();
    next();
});

module.exports = mongoose.model( 'Place', placeSchema );