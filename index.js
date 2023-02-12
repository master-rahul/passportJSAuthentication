const express = require('express');                                 // Fetching Express module.
const static = express.static('./assets');                          // Setting the Directory for static files.
const expressLayouts = require('express-ejs-layouts');              // Fetching the Express-EJS layout module.
const routes = require('./routes/index');                           // Adding a route path.
const bodyParser = require('body-parser');                          // Fetching body-parser to decode encoded payload data.
const cookieParser = require('cookie-parser');                      // Fetching cookie-parser to access cookies in request and resposes.
const expressSession = require('express-session');                  // Fetching express session.
const passport = require('passport');                               // Fetching passport modules.
//const passportLocal = require('./config/passport_local_strategy');// Fetching passport-local configuration.
const MongoStore = require('connect-mongo');                        // For storing session cookie so that cookies are not reset when server is restarted.
const db = require('./config/mongoose');
const app = express();                                              // Fetching Express constructor response to app variable.

app.set('view engine', 'ejs');                                      // Setting up Template Engine. 
app.set('views', './views');                                        // Setting the directory for Template Engine files (EJS).
app.set('layout extractStyles', true);                              // Setting Layout properties for extracting Styles from incoming template file.
app.set('layout extractScripts', true);                             // Setting Layout propertied for extracting Script from incoming template file.

app.use(bodyParser.urlencoded({ extended: false }));                // Middleware to decode the payload.

app.use(cookieParser());                                            // Converts cookies data into key:value pairs

app.use(static);                                                    // Using the static in middleware to access static files.

app.use(expressLayouts);                                            // Using layout as middleware to manage layout of the rendered page.

app.use(expressSession({
    name: 'passport Autentications',
    //TODO : change the secret phrase before deploying in production
    secret: 'secret-phrase',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 5)
    },
    store: MongoStore.create(
        {                                      // mongo store is used to store cookie in db.
        mongoUrl: 'mongodb://localhost/passportJSAuthentication',
        autoRemove: 'disabled',
        }, function(error) {
            console.log(error || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', routes);                                               // Using routes when request.url == '/'.

app.listen(process.env.PORT||3000, function(error) {
    if(error) console.error('Error in running Express Server');
    else console.log('Express Server running Successfully');
})