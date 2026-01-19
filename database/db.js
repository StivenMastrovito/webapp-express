import mysql from "mysql2"

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

connection.connect((err) => {
    if (err) throw err

    console.log("Connection to the database done");
})

export default connection