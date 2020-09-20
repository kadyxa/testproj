let database = require('./conf');
const mysql = require('mysql');

let transation ={};

transation.getAll = () =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
            	throw err;
            }
        });
		connection.query('SELECT id, name, ""  as image, showGreyImage, text, active, priceOne, priceTwo, showPrice, weghtOne, weghtTwo, showWeight, category FROM transation', (err,rows) => {
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
        //let sql= 'SELECT CONVERT(`image` USING utf8)  as image FROM transation WHERE id = ?';
        let sql= 'SELECT * FROM `test-transactions`.transactions WHERE `user_id` = ? LIMIT ?, 10 ';
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
//ORDER BY price DESC / ASC
        let sql= 'SELECT * FROM `test-transactions`.transactions WHERE `user_id` = ? AND `date` = ? LIMIT ?, 10 ';
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

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });

        let values = [
            item.date,
            item.userid,
            item.amount ,
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
    });
};

transation.update = (item) =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });


        let values = [
            item.date,
            item.userid,
            item.amount ,
            item.type,
            item.currency,
            item.id
        ];

        let sql = "UPDATE `transation`  SET `date`= ?, `user_id` = ? ,`amount`= ?,`type`= ?,`currency`= ? WHERE (`id` = ? )";
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