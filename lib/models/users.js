const { getClient, promiseStopClient }= require('../../database/mysql_db')
const util = require('util')

// const config = require('config')
// const db = config.get('MySqlConnection.dbConfig')

// connectDB()

function selectQuery() {
  return "SELECT * FROM USERS" 
}

function selectWithActive() {
  return (selectQuery() + " WHERE ACTIVE = TRUE")
}

async function exists( email, mobile, db = getClient()) {
  const sql = selectWithActive() + " AND (email = ? OR mobile_number = ?)"
  const values = [email, mobile]
  try{
    const userExist = await db.promiseQuery(sql, values)
    console.log('userExist', userExist)
    return userExist
  } catch(err) {
    console.log('error', err)
    await promiseStopClient()  
  }
}

async function create( name, email, mobile, password, db = getClient()){
  const sql = "INSERT into users (first_name, email, mobile_number, password, active) VALUES (?,?,?,?, true) "
  const values = [name, email, mobile, password]
  try{
    const user = await db.promiseQuery(sql, values)
    console.log('user', user)
    return user.affectedRows === 1
  } catch(err) {
    console.log('error', err)
    await promiseStopClient()
  }
    // const sql = "insert into `users` (`first_name`, `last_name`, `email`, `mobile_number`,`gender`,`dob`, `active`) VALUES ('Rishabh2', 'Gupta', 'rishabhgupta1411@gmail.com', '9956619654','Male','14/11/1992', true)";
    // db.query(sql)
    // console.log("Connected!");
}

async function findByEmail(email, db = getClient()) {
  const sql = selectWithActive() + " AND email = ?"
  const values = [email]
  try{
    const user = await db.promiseQuery(sql, values)
    // console.log('user', user)
    return user
  } catch(err) {
    console.log('error', err)
    await promiseStopClient()
  }
}


// insert()

module.exports = {
  create,
  exists,
  findByEmail
}