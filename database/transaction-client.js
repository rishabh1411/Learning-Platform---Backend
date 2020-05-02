class TransactionClient {
  constructor (client) {
    this.client = client
    this.transactionStarted = true
  }

  query (sql) {
    return this.client.query(sql)
  }

  async commit () {
     try {
       await this.client.query('COMMIT')
     } finally {
       this.client.release()
     }
  }

  async rollback () {
    try {
      await this.client.query('ROLLBACK')
    } finally {
      this.client.release()
    }
  }
}

module.exports = TransactionClient