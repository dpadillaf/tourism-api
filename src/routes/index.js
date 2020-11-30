const express = require( 'express' );

const app = express();

app.use( require( './login' ) );
app.use( require( './department' ) );
app.use( require( './city' ) );

module.exports = app;