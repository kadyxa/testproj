let database = require('./conf');
const mysql = require('mysql');

let user ={};

user.getAuth = (userData) =>{

    return new Promise((resolve,reject) => {

            const connection = mysql.createConnection(database);

            connection.connect((err) => {
                if (err) {
                    reject(err);
                }
            });
            let sql = `select * from userinfo where name = ? LIMIT 1`;
            let values = [`${userData.username}`]
            connection.query(sql, values, (err, rows) => {
                if (err) {
                    reject(err);
                }
                connection.end();

                if(rows.length > 0) {
                    //resolve(JSON.parse(JSON.stringify(rows[0])));
                    resolve(rows[0]);
                }else{
                    reject(err);
                }
            });

	});
};

user.findById = (user) => {
    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });
        console.log(user)
        let sql= 'select * from userinfo where id = ?';
        let values = [user.id];
        connection.query(sql , values , (err,rows) => {
            if(err){
                reject(err);
                throw err;
            }
            connection.end();
            if(rows.length > 0) {
                //resolve(JSON.parse(JSON.stringify(rows[0])));
                resolve(rows[0]);
            }else{
                reject(err);
            }
        });
    });
};




user.getTransactionsАmountById = (id) =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });
        let sql= `SELECT
            SUM(amount)               
            FROM  transactions
            WHERE user_id = ?`;
        let values = [id];
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


user.insert = (item) =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });

        let values = [
            item.username,
            item.password,
            item.currency
        ];
        let sql = "INSERT INTO `userinfo` (`name`, `password`, `currency`) VALUES (?,?,?)";
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

user.update = (item) =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });


        let values = [
            item.username,
            item.password,
            item.currency,
            item.id
        ];

        let sql = "UPDATE `userinfo`  SET `name`= ?, `password` = ? ,`currency`= ? WHERE (`id` = ? )";
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

user.delete = (item) =>{

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });
        let sql = "DELETE FROM `userinfo` WHERE  (`id` = ? )";
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

user.deleteAll = () =>{

    let self = this;

    return new Promise((resolve,reject) => {
        const connection = mysql.createConnection(database);
        connection.connect((err) => {
            if (err){
                reject(err);
                throw err;
            }
        });
        let sql = "TRUNCATE TABLE `userinfo`";
        connection.query( sql , (err,rows) => {
            if(err){
                reject(err);
                throw err;
            }
            connection.end();

            self.insert({username:'admin',password:'admin'}).then(resp=>{
                rows.createDefaultUser = resp
                return resolve(rows);
            }).catch( error => {
                return reject(error)
            });
        });
    });
};

module.exports = user;