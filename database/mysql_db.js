const mysql = require('mysql')
const config = require('config')
const db = config.get('MySqlConnection.dbConfig')
const util = require('util')
// const db = require('../config/default.json');
const Client = require('./client')
const logger = require('../lib/logger')
let pool

async function connectDB() {
    try{
        const connection = createConn()
        await connection.connect(function(err) {
            if (err) {
                throw err;
            }
            console.log('mysql connected.......')
            return connection
        });
    } catch(err) {
        console.error(err.message)
        process.exit(1)
    }
}

// function getClient () {
//   console.log('getClient')
//   console.log(db)
//   console.log(db.MySqlConnection.dbConfig)
//   if(!pool){
//       pool = mysql.createPool(db.MySqlConnection.dbConfig)
//     //   console.log(pool)
//       pool.on('error', poolError)
//   }
//   return new Client(pool)
// }

function getClient () {
  console.log('getClient')
  // console.log(db)
  // console.log(db.MySqlConnection.dbConfig)
  if(!pool){
    pool = mysql.createConnection(db)
      console.log('create new pool')
    pool.connect()
    pool.on('error', poolError)
  }
  return new Client(pool)
}

const poolError = (err) => {
    logger.error('Unexpected error on idle client', err)
    process.exit(-1)
}

async function stopClient() {
  if(!pool) return
  try{
      await pool.end()
      pool = null
  } catch (e) {
      logger.error(e)
  }
}

async function promiseStopClient() {
  if(!pool) return
  try {
    await util.promisify( pool.end())
    pool = null
  } catch (e) {
    logger.error(e)
  }
}

module.exports = 
{
  getClient,
  stopClient,
  promiseStopClient
}

