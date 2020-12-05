const mongoose = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

let validRoles = {
    values: [ 'ADMIN_ROLE', 'USER_ROLE', 'MUNICIPALITY_ADMIN_ROLE', 'SITE_ADMIN_ROLE' ],
    message: '{VALUE} no es un rol válido'
}

const Schema = mongoose.Schema;

let userSchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ]
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El campo email es requerido' ]
    },
    password: {
        type: String,
        required: [ true, 'El campo password es requerido' ]
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place'
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    created_at: { 
        type: Date, 
        default: Date.now() 
    }
} );

userSchema.methods.toJSON = function (){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } );

module.exports = mongoose.model( 'User', userSchema );