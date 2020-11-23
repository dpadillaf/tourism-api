/**
 * port configuration
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * environment
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * define DB
 */
let urlDB;

if ( process.env.NODE_ENV === 'dev' ){
    urlDB = 'mongodb://localhost:27017/tourism-app-dev';
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

/**
 * Token expiration
 */
process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30;

/**
 * seed authentication
 */
process.env.SEED = process.env.SEED || 'token-desarrollo';

/**
 * google client id
 */
process.env.CLIENT_ID = process.env.CLIENT_ID || '469088688463-o5qcjdeqma80ukm8rdgb3ipt5b3aol5d.apps.googleusercontent.com';