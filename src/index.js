const express = require( 'express' );
const bodyParser = require( 'body-parser' );

require( './config/config' );

const app = express();

//db connection
require( './database' );

//middlewares
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

//import routes
app.use( require( './routes/index' ) );

//init server
app.listen( process.env.PORT, () => {
    console.log( `Listen on port ${ process.env.PORT }` );
} );