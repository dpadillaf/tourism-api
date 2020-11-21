const express = require( 'express' );
//const mongoose = require( 'mongoose' );
const bodyParser = require( 'body-parser' );

require( './config/config' );

const app = express();

//db connection

//request data handler
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

//import routs
app.use( require( './routes/index' ) );

//init server
app.listen( process.env.PORT, () => {
    console.log( `Listen on port ${ process.env.PORT }` );
} );