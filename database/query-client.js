class QueryClient {
  constructor (client) {
    this.client = client
  }

  fetchSql() {
    return this.client.sql
  }
}

module.exports = QueryClient