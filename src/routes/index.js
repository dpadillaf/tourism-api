const express = require( 'express' );

const app = express();

app.use( require( './login' ) );
app.use( require( './department' ) );
app.use( require( './city' ) );
app.use( require( './place' ) );
app.use( require( './tag' ) );
app.use( require( './placeTag' ) );
app.use( require( './opinion' ) );

module.exports = app;