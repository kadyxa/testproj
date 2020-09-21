const express = require('express');

const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({

        secret: 'W$q4=25*8%v-}UV',
        resave: true,
        saveUninitialized: true,
        cookie: {
              maxAge: 1000*60*60*24
        }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.text({type: '*/*', limit: '100mb'}));
app.use( express.json() );

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


require('./res_srv/routes')(app,passport);

 
app.listen( process.env.PORT || '3000' ,() => {
	console.log(`server runing`);
});






