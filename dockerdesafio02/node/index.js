const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'dbmysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Camila')`;
connection.query(sql);

let result = '<h1>Full Cycle Rocks!</h1>'

const query = `select * from people`;

connection.query(query, function (err, results) {
    if (err) throw err;
    results.forEach(function (item) {
        result += '<p>' + item.name + '</p>'
    });
});

connection.end(); 


app.get('/', (req, res) => {
    res.send(result)
})

app.listen(port, () => {
    console.log('Running at port: ' + port)
})