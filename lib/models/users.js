const { getClient, promiseStopClient }= require('../../database/mysql_db')
const util = require('util')

// const config = require('config')
// const db = config.get('MySqlConnection.dbConfig')

// connectDB()

function selectQuery() {
  return "SELECT * FROM USERS" 
}

function selectWithActive() {
  return (selectQuery() + " WHERE ACCOUNT_STATUS = 'ACTIVE'")
}

async function exists( email = null, mobile = null, db = getClient()) {
  const sql = selectWithActive() + " AND (email = ? OR mobile = ?)"
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

async function create( data, db = getClient()){
  const {
    name = null, 
    email = null, 
    mobile = null, 
    password, 
    dob = null, 
    gender = null, 
    accountStatus = 'active', 
    age = null 
  }  = data
  console.log(email)
  const sql = "INSERT into users (name, email, mobile, password, dob, gender, account_status, age) VALUES (?,?,?,?,?,?,?,?) "
  const values = [name, email, mobile, password, dob, gender, accountStatus, age]
  try{
    const user = await db.promiseQuery(sql, values)
    console.log('user', user)
    return user.affectedRows === 1
  } catch(err) {
    console.log('error', err)
    await promiseStopClient()
  }
}

async function findByEmail(email = null, mobile = null, db = getClient()) {
  let sql =  selectWithActive();
  if(email == null){
    sql += " AND mobile = ?"
  }
  else if(mobile == null){
    sql += " AND email = ?"
  }
  else {
    sql += " AND (email = ? OR mobile = ?)"
  }
  const values = [email, mobile]
  try{
    const user = await db.promiseQuery(sql, values)
    console.log(user)
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