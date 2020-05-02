const TransactionClient = require('./transaction-client')
const QueryClient = require('./query-client')
const util = require( 'util' )

class Client {
  constructor (pool) {
    this.pool = pool
  }

  query (sql, values, callbackFn) {
    // return this.pool.query(sql, values, callbackFn)
    // return this.pool.query(sql, values, callbackFn)
    // console.log('client1', client1)
    const client = this.pool.query(sql, values, callbackFn)

    return new QueryClient(client)
  }

  promiseQuery (sql, values) {
    return util.promisify( this.pool.query )
        .call( this.pool, sql, values )
  }

  fetchSql(sql) {
    return this.pool.query(sql).sql
  }

  async transaction () {
    const client = await this.pool.connect()
    await client.query('BEGIN')

    return new TransactionClient(client)
  }
}

module.exports = Client