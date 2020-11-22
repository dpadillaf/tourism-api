const mongoose = require( 'mongoose' );

const URI = process.env.URLDB;

mongoose.connect( URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
} );

const connection = mongoose.connection;

connection.once( 'open', () => {
    console.log( 'DB is connected' );
} );