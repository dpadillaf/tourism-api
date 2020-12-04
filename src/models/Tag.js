const mongoose = require( 'mongoose' );

const PlaceTag = require( '../models/PlaceTag' );

const Schema = mongoose.Schema;

let tagSchema = new Schema( {
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

tagSchema.pre('deleteOne', function(next) { 
    // remove references when a tag is removed
    PlaceTag.deleteMany( { tag: this.id } ).exec();//console.log('ok '+ JSON.stringify(this))
    next(); 
}); 

module.exports = mongoose.model( 'Tag', tagSchema );