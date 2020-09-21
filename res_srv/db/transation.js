let database = require('./conf');
const mysql = require('mysql');
const xml2js = require('xml2js');
const axios = require('axios');

const curensisArr = require('../db/currencies');

let transation ={};


// get curreensis by day
// this function needs for recalculate amount by date from curreensis to rub
function getCurensiseByDate(data){
    return new Promise((resolve,reject)=> {
        let incomeCurrensis = curensisArr.indexOf(data.currency.toUpperCase());
        if( incomeCurrensis !== -1 ) {
            axios({
                url: `http://www.cbr.ru/scripts/XML_daily.asp?date_req=${data.date}`, //02/03/2002/
                method: "get",
                headers: {'Content-type': 'text/html; charset=UTF-8'},
                data: ''
            }).then(resp => {
                let parser = new xml2js.Parser();
                let curensis = null;
                parser.parseString(resp.data, function (err, result) {
                    curensis = result;
                });

                let curency = curensis.ValCurs.Valute.filter(function (item) {
                    return curensisArr.indexOf(item.CharCode[0]) === curensisArr.indexOf(data.currency.toUpperCase());
                });

                if(curency.length > 0) {
                    resolve(curency[0]);
                }else{
                    reject({err:'no curency match'});
                }
            }).catch(err => {
                reject(err);
            })
        }else{
            resolve({Value:['1']});
        }
    });
}

transation.getAll = () =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });
        connection.query('SELECT * FROM transactions', (err,rows) => {
            if(err){
                reject(err);
                throw err;
            }
            connection.end();
            return resolve(rows);
        });
    });
};

transation.getTransactionsByPagination = (item) =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });
        let sql= 'SELECT * FROM transactions WHERE `user_id` = ? LIMIT ?, 10 ';
        let values = [ item.id, item.page * 10 ];
        connection.query(sql , values , (err,rows) => {
            if(err){
                reject(err);
                throw err;
            }
            connection.end();
            return resolve(rows);
        });
    });
};


transation.getTransactionsByDate = (item) =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });

        let order = '';
        if(item.order === 'asc'){
            order =  'ORDER BY `date` ASC'
        }else{
            order = 'ORDER BY `date` DESC'
        }
        let sql= 'SELECT * FROM `test-transactions`.transactions WHERE `user_id` = ? AND `date` = ? LIMIT ?, 10 '+order;
        let values = [ item.id, new Date( item.date ), item.page * 10 ];

        connection.query(sql , values , (err,rows) => {
            if(err){
                reject(err);
                throw err;
            }
            connection.end();
            return resolve(rows[0].image);
        });
    });
};


transation.insert = (item) =>{

    let data = {date:item.date,currency:item.currency};

    return new Promise((resolve,reject) => {
        getCurensiseByDate(data).then( resp =>{
            const connection = mysql.createConnection(database);
            connection.connect((err) => {
                if (err){
                    reject(err);
                    throw err;
                }
            });

            let values = [
                new Date(item.date),
                item.userid,
                Number(( parseFloat(resp.Value[0].replace(",",".")) * item.amount  )).toFixed(2) ,
                item.type,
                item.currency
            ];

            let sql = "INSERT INTO `test-transactions`.`transactions` (`date`, `user_id`, `amount`, `type`, `currency`) VALUES (?, ?, ?, ?, ?)";
            connection.query(sql , values , (err,rows) => {
                if(err){
                    reject(err);
                    throw err;
                }
                connection.end();
                return resolve(rows);
            });
        }).catch( error => {
            reject( error );
        })
    });

};

transation.update = (item) =>{
    let data = {date:item.date,currency:item.currency};
    return new Promise((resolve,reject) => {
        getCurensiseByDate(data).then( resp => {
            const connection = mysql.createConnection(database);
            connection.connect((err) => {
                if (err) {
                    reject(err);
                    throw err;
                }
            });


            let values = [
                //item.date,
                new Date(item.date),
                item.userid,
                Number(( parseFloat(resp.Value[0].replace(",",".")) * item.amount  )).toFixed(2) ,
                item.type,
                item.currency,
                item.id
            ];

            let sql = "UPDATE `transation`  SET `date`= ?, `user_id` = ? ,`amount`= ?,`type`= ?,`currency`= ? WHERE (`id` = ? )";
            connection.query(sql, values, (err, rows) => {
                if (err) {
                    reject(err);
                    throw err;
                }
                connection.end();
                return resolve(rows);
            });
        }).catch( error => {
            reject( error );
        })
    });
};

transation.delete = (item) =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });
        let sql = "DELETE FROM `transation` WHERE  (`id` = ? )";
        connection.query(sql , item.id , (err,rows) => {
            if(err){
                reject(err);
                throw err;
            }
            connection.end();
            return resolve(rows);
        });
    });
};

transation.deleteAll = () =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });
        let sql = "TRUNCATE TABLE `transation`";
        connection.query( sql , (err,rows) => {
            if(err){
                reject(err);
                throw err;
            }
            connection.end();
            return resolve(rows);
        });
    });
};

module.exports = transation;