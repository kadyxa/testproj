
const express = require('express');

const axios = require('axios');

const xml2js = require('xml2js');

const router = express.Router();

const validateSchema = require('../validate');


const db = require('../db');


module.exports = (app,passport)=>{

require('../auth/passport')(passport);

app.use(router);





function checkAdminPermissions(req){
    return req.user.role === 1
}


// user start ==========================================================//

    /**
     * @api {get} / Sever Status information
     * @apiName GetServerStatus
     * @apiGroup Server
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "sever": "is working"
     *     }
     *
     */

router.get('/',(req,res,next) => {
      res.json( {sever:'is working'} );
});


    /**
     * @api {post} / USER Create User
     * @apiName USERCreateUser
     * @apiGroup USER
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "sever": "is working"
     *     }
     *
     */
router.post('/createUser', validateSchema('new-user'),(req, res,next) => {
            let item = req.body;
            db.user.insert (item).then( result => {
                res.json( result );
            });
});

router.post('/updateUser', validateSchema('old-user'), (req, res) => {
    let item = req.body;

    if( item.id === req.user.id || checkAdminPermissions(req) ) {
        req.body.id
        db.user.update(item).then(result => {
            res.json(result);
        });
    }else{
        res.json( {err:'no permissions'} );
    }
});

router.post('/daleteUser', validateSchema('old-user'), (req, res) => {
        let item = req.body;
        if( item.id === req.user.id || checkAdminPermissions(req) ) {
            let item = req.body;
            db.user.delete(item).then(result => {
                res.json(result);
            });
        }
});

router.post('/deleteAllUsers', validateSchema('old-user'), (req, res) => {
        let item = req.body;
        if( item.id === req.user.id || checkAdminPermissions(req) ) {
            let item = req.body;
            db.user.deleteAll().then(result => {
                res.json(result);
            });
        }
});



router.post('/logout', (req, res) => {
    req.logout();
    res.json({logout:"success"});
});

    router.post(
        '/login',
        function(req, res,next) {
            passport.authenticate('json', function(err, user, info) {
                console.log(err, user, info)
                if( err === null && user !== false ) {
                    req.login(user, function(error) {
                        if (error) return next(error);
                        res.json({auth:user} );
                    });
                }else{
                    res.json({err:"not authenticated"});
                }
            })(req, res);
        }
    );


// user end ==========================================================//



// transactions start ==========================================================//

router.get('/getImageDataById',(req,res,next) => {
    let item = JSON.parse(req.query.id);
    db.transation.getImageDataById (item).then( result => {
               img = Buffer.from(img, 'base64');

               res.writeHead(200, {
                   'Content-Type': 'image/png',
                   'Content-Length': img.length
               });
              res.end(img);
    });
});

router.get('/transationImageById',(req,res,next) => {
    let item = JSON.parse(req.query.id);
    db.transation.getImageById (item).then( result => {
       res.json( result );

    });
});

router.post('/transationGetAll',(req,res,next) => {
    db.transation.getAll().then( result => {
        res.json( result );
    });
});

router.post('/transationInsert',validateSchema('transation-insert'),(req,res,next) => {
    let item = req.body;
    db.transation.insert(item).then( result => {
        res.json( result );
    });
});

router.post('/transationUpdate',(req,res,next) => {
    let item = JSON.parse(req.body);
    db.transation.update(item).then( result => {
        res.json( result );
    });
});

router.post('/transationDelete',(req,res,next) => {
    let item = JSON.parse(req.body);
    db.transation.delete(item).then( result => {
        res.json( result );
    });
});

router.post('/transationDeleteAll',(req,res,next) => {
    db.transation.deleteAll().then( result => {
        res.json( result );
    });
});

router.get('/getCurrenses',(req,res,next) => {
	console.log(req.query.date_req)
	if(req.query.date_req != 'undefined'){

		let curensisArr = [];
		function getCurensise(){
			axios({
				url:`http://www.cbr.ru/scripts/XML_daily.asp?date_req=${req.query.date_req}`, //02/03/2002/
				method:"get",
				headers: { 'Content-type': 'text/html; charset=UTF-8' },
				data:''
			}).then( resp => {
				let parser = new xml2js.Parser();
				parser.parseString( resp.data, function (err, result) {
					curensisArr = result;
						res.json( curensisArr );
				});
			}).catch( err => {
				console.log( err );
				setTimeout( function(){
					getCurensise();
				}, 60000);
			})
		}
		getCurensise();
	}else{
		res.json( {error:"no data"} );
	}

    
});

// transactions end ===================================================================//






};