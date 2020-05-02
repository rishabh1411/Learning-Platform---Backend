const Postgrator = require('postgrator')

function getPostgratorInstance(schema, migrationFolder) {
    if(!schema || !migrationFolder){
        throw new Error('Either schema or migrationFolder is not present.')
    }
    console.log('abcde2')

    return new Postgrator({
        migrationDirectory: migrationFolder,
        driver: 'mysql',
        // Database connection config
        host: '127.0.0.1',
        port: 3306,
        database: 'mydb',
        username: 'root',
        password: 'password', 
        // ssl: false,
        // schemaTable: 'portal_migrations',
        currentSchema: schema
      })
}   

async function  migrateMySqlSchema(migrationFolder) {
  const postgrator = getPostgratorInstance('public', migrationFolder)
  // console.log(postgrator)
  // try{
    await postgrator.migrate().then(appliedMigrations => console.log(appliedMigrations))
    .catch(error => {
      console.log(error)
      
      console.log(error.appliedMigrations)
    })
    console.log('abcde')
  // }
  // catch(e) {
  //   console.log(e)
  // }
  
}

// console.log(__dirname + '/migrations')
migrateMySqlSchema( __dirname + '/migration_folder')

module.exports = {
  migrateMySqlSchema
}