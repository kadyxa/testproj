
const express = require('express');

const axios = require('axios');

const router = express.Router();

const validateSchema = require('../validate');

const curensisArr = require('../db/currencies');

const db = require('../db');

const xml2js = require('xml2js');


module.exports = (app,passport)=>{

    require('../auth/passport')(passport);

    app.use(router);





    function checkAdminPermissions(req){
        return req.user.role === 1
    }


// server start ================================//

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
     * @api {get} /date get date
     * @apiName GetDate
     * @apiGroup Server
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *        "date": "2020-09-21T10:54:51.406Z"
     *    }
     */

    router.get('/date',function (req,res){
        res.json({date:new Date()});
    });

// server end ================================//

// user start ==========================================================//

    /**
     * @api {post} /createUser Create User
     * @apiName CreateUser
     * @apiGroup USER
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiParamExample {json} Param-Example:
     *     {
     *       "username":"admin",
     *       "password":"admin",
     *       "currency":"RUB"
     *     }
     *
     * @apiParam {String} required_variable {"username": "admin","password": "admin","currency": "RUB"}
     *
     * @apiPermission admin
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "sever": "is working"
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */
    router.post('/createUser', validateSchema('new-user'),(req, res,next) => {
        let item = req.body;
        db.user.insert (item).then( result => {
            res.json( result );
        });
    });


    /**
     * @api {post} /updateUser Update User
     * @apiName UpdateUserUser
     * @apiGroup USER
     *
     * @apiPermission admin
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     *
     * @apiParamExample {json} Param-Example:
     *     {
     *       "id":1,
     *       "role":1,
     *       "username":"admin",
     *       "password":"admin",
     *       "currency":"RUB"
     *     }
     *
     * @apiParam {String} required_variable { "id":1,"role":1,"username": "admin","password": "admin","currency": "RUB"}
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "fieldCount": 0,
     *           "affectedRows": 1,
     *           "insertId": 0,
     *           "serverStatus": 2,
     *           "warningCount": 0,
     *           "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
     *           "protocol41": true,
     *           "changedRows": 1
     *       }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     *
     */
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


    /**
     * @api {post} /deleteUser Delete User
     * @apiName DeleteUser
     * @apiGroup USER
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiPermission admin
     *
     * @apiParamExample {json} Param-Example:
     *     {
     *       "id":1,
     *       "role":1,
     *       "username":"admin",
     *       "password":"admin",
     *       "currency":"RUB"
     *     }
     *
     * @apiParam {String} required_variable { "id":1,"role":1,"username": "admin","password": "admin","currency": "RUB"}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "fieldCount": 0,
     *           "affectedRows": 1,
     *           "insertId": 0,
     *           "serverStatus": 2,
     *           "warningCount": 0,
     *           "message": "",
     *           "protocol41": true,
     *           "changedRows": 0
     *      }
     *
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */
    router.post('/deleteUser', validateSchema('old-user'), (req, res) => {
        let item = req.body;
        if( item.id === req.user.id || checkAdminPermissions(req) ) {
            let item = req.body;
            db.user.delete(item).then(result => {
                res.json(result);
            });
        }
    });

    /**
     * @api {post} /deleteAllUsers Delete All Users
     * @apiName DeleteAllUsers
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
     * @apiPermission admin
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */
    router.post('/deleteAllUsers', validateSchema('old-user'), (req, res) => {
        let item = req.body;
        if( item.id === req.user.id || checkAdminPermissions(req) ) {
            let item = req.body;
            db.user.deleteAll().then(result => {
                res.json(result);
            });
        }
    });


    /**
     * @api {post} /logout Logout
     * @apiName Logout
     * @apiGroup USER
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *      {
     *          "logout": "success"
     *      }
     *
     * @apiPermission admin
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */
    router.post('/logout', (req, res) => {
        req.logout();
        res.json({logout:"success"});
    });


    /**
     * @api {post} /login Login user
     * @apiName Login
     * @apiGroup USER
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiPermission admin
     *
     * @apiParam {String} required_variable '{"username": "description","password": "description","currency": "string","description": "username of account"}'
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *           "auth": {
     *              "user": "admin",
     *              "id": 1,
     *              "currency": 5,
     *              "role": 1
     *           }
     *      }
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */


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

    /**
     * @api {post} /getTransactionsАmountById get Transactions Аmount By Id user
     * @apiName getTransactionsАmountById
     * @apiGroup USER
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiPermission admin
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "SUM(amount)": 130.20000076293945
     *      }
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */

    router.post(
        '/getTransactionsAmountById',
        validateSchema('old-user'), (req, res) => {
            let item = req.body;
            if( item.id === req.user.id || checkAdminPermissions(req) ) {
                let item = req.body;
                db.user.getTransactionsAmountById(req.user.id).then(result => {
                    res.json(result);
                });
            }
        });


// user end ==========================================================//



// transactions start ==========================================================//


    /**
     * @api {post} /getTransactionsАmountById get Transactions Аmount By Id user
     * @apiName getTransactionsАmountById
     * @apiGroup TRANSACTIONS
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiPermission admin
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "SUM(amount)": 130.20000076293945
     *      }
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */
    router.post('/transactionsGetAll',(req,res,next) => {
        db.transation.getAll().then( result => {
            res.json( result );
        });
    });

    /**
     * @api {post} /transactionsInsert Transactions Insert
     * @apiName transactionsInsert
     * @apiGroup TRANSACTIONS
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiPermission admin
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "fieldCount": 0,
     *         "affectedRows": 1,
     *         "insertId": 5,
     *         "serverStatus": 2,
     *         "warningCount": 0,
     *         "message": "",
     *         "protocol41": true,
     *         "changedRows": 0
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */
    router.post('/transactionsInsert',validateSchema('new-transation'),(req,res,next) => {
        let item = req.body;
        db.transation.insert(item).then( result => {
            res.json( result );
        });
    });

    /**
     * @api {post} /transactionsUpdate transactions Update
     * @apiName transactionsUpdate
     * @apiGroup TRANSACTIONS
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiPermission admin
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "fieldCount": 0,
     *         "affectedRows": 1,
     *         "insertId": 5,
     *         "serverStatus": 2,
     *         "warningCount": 0,
     *         "message": "",
     *         "protocol41": true,
     *         "changedRows": 0
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */
    router.post('/transactionsUpdate',(req,res,next) => {
        let item = JSON.parse(req.body);
        db.transation.update(item).then( result => {
            res.json( result );
        });
    });

    /**
     * @api {post} /transactionsDelete transactions Delete
     * @apiName transactionsDelete
     * @apiGroup TRANSACTIONS
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiPermission admin
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "fieldCount": 0,
     *         "affectedRows": 1,
     *         "insertId": 5,
     *         "serverStatus": 2,
     *         "warningCount": 0,
     *         "message": "",
     *         "protocol41": true,
     *         "changedRows": 0
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */
    router.post('/transactionsDelete',(req,res,next) => {
        let item = JSON.parse(req.body);
        db.transation.delete(item).then( result => {
            res.json( result );
        });
    });

    /**
     * @api {post} /transactionsDeleteAll transactions Delete All
     * @apiName transactionsDeleteAll
     * @apiGroup TRANSACTIONS
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiPermission admin
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "fieldCount": 0,
     *         "affectedRows": 1,
     *         "insertId": 5,
     *         "serverStatus": 2,
     *         "warningCount": 0,
     *         "message": "",
     *         "protocol41": true,
     *         "changedRows": 0
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Not Found
     *     {
     *       "err":"not authenticated"
     *     }
     */
    router.post('/transactionsDeleteAll',(req,res,next) => {
        db.transation.deleteAll().then( result => {
            res.json( result );
        });
    });


// transactions end ===================================================================//

// Currencies start ===================================================================//

    /**
     * @api {get} /getCurrencies get Currencies
     * @apiName getCurrencies
     * @apiGroup Currencies
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *        "AUD",
     *        "GBP",
     *        "BYR",
     *        "DKK",
     *        "USD",
     *        "EUR",
     *        "ISK",
     *        "KZT"
     *     ]
     *
     */
    router.get('/getCurrencies',(req,res,next) => {
        res.json( curensisArr );
    });

    /**
     * @api {get} /getCurrenciesApi get Currencies Api
     * @apiName getCurrenciesApi
     * @apiGroup Currencies
     *
     * @apiSuccess {String} JSONStatus Status of the Sever.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *	        "ValCurs": {
     *		        "$": {
     *			        "Date": "18.09.2020",
     *			        "name": "Foreign Currency Market"
     *		        },
     *		        "Valute": [
     *			        {
     *				        "$": {"ID": "R01010"},
     *				        "NumCode": ["036"],
     *				        "CharCode": ["AUD"],
     *			            "Nominal": ["1"],
     *			            "Name": ["������������� ������"],
     *			            "Value": ["54,8842"]
     *		            },
     *		            {
     *			            "$": {"ID": "R01020A"},
     *			            "NumCode": ["944"],
     *			            "CharCode": ["AZN"],
     *			            "Nominal": ["1"],
     *			            "Name": ["��������������� �����"],
     *			            "Value": ["44,2579"]
     *		            }
     *	            ]
     *          }
     *      }
     *
     */
    router.get('/getCurrenciesApi',(req,res,next) => {
        console.log(req.query.date_req)
        if(req.query.date_req != 'undefined') {

            function getCurensise(){
                axios({
                    url:`http://www.cbr.ru/scripts/XML_daily.asp?date_req=${req.query.date_req}`, //02/03/2002/
                    method:"get",
                    headers: { 'Content-type': 'text/html; charset=UTF-8' },
                    data:''
                }).then( resp => {
                    let parser = new xml2js.Parser();
                    let currensis = [];
                    parser.parseString( resp.data, function (err, result) {
                        currensis = result;
                        res.json( currensis );
                    });
                }).catch( err => {
                    console.log( err );
                    setTimeout( function(){
                        getCurensise();
                    }, 30000);
                })
            }
            getCurensise();
        }else{
            res.json( {error:"no data"} );
        }

    });

// Currencies end ===================================================================//





};