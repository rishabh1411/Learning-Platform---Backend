const { getClient, promiseStopClient }= require('../../database/mysql_db')
const util = require('util')

function selectQuery() {
  return "SELECT * FROM PROFILES" 
}

function selectWithActive() {
  return (selectQuery() + " WHERE STATUS = 'ACTIVE'")
}

async function save( payload, db = getClient()){
  const { id = null, name = null, bioTitle = null, bioDescription = null, status = 'active', profilePictureId = null, userId } = payload
  let sql = "INSERT into profiles (id, name, bio_title, bio_description, status, profile_picture_id, user_id) VALUES (?,?,?,?,?,?,?) "
  sql += "ON DUPLICATE KEY UPDATE name=VALUES(name), bio_title=VALUES(bio_title), bio_description=VALUES(bio_description), status=VALUES(status), profile_picture_id=VALUES(profile_picture_id), user_id=VALUES(user_id)"
  const values = [id, name, bioTitle, bioDescription, status, profilePictureId, userId]
  try{
    const profile = await db.promiseQuery(sql, values)
    console.log('profile', profile)
    return profile.affectedRows === 1
  } catch(err) {
    console.log('error', err)
    res.status(500).send('Server error')
    await promiseStopClient()
  }
}

// `id` INT(11) NOT NULL AUTO_INCREMENT,
// `name` VARCHAR(255) NULL DEFAULT NULL,
// `bio_title` VARCHAR(255) NULL DEFAULT NULL,
// `bio_description` VARCHAR(255) NULL DEFAULT NULL,
// `status` ENUM('active', 'inactive', 'blocked', 'cancelled') NULL DEFAULT 'active',
// `profile_picture_id` INT(11) NULL DEFAULT NULL,
// `created_at` TIMESTAMP NULL DEFAULT NULL,
// `updated_at` TIMESTAMP NULL DEFAULT NULL,
// `user_id` INT(11) NOT NULL,
// PRIMARY KEY (`id`, `user_id`),
// INDEX `profile_picture_id` (`profile_picture_id` ASC) ,
// INDEX `fk_profiles_users1_idx` (`user_id` ASC) ,
// CONSTRAINT `profiles_ibfk_1`
//   FOREIGN KEY (`profile_picture_id`)
//   REFERENCES `mydb`.`media_details` (`id`),
// CONSTRAINT `fk_profiles_users1`
//   FOREIGN KEY (`user_id`)
//   REFERENCES `mydb`.`users` (`id`)
//   ON DELETE NO ACTION
//   ON UPDATE NO ACTION)

async function findById(id, db = getClient()) {
  const sql = selectWithActive() + " AND id = ?"
  const values = [id]
  try{
    const result = await db.promiseQuery(sql, values)
    // console.log('user', user)
    return result
  } catch(err) {
    console.log('error', err)
    await promiseStopClient()
  }
}

async function findByUserId(userId, db = getClient()) {
  const sql = selectWithActive() + " AND user_id = ?"
  const values = [userId]
  try{
    const result = await db.promiseQuery(sql, values)
    return result
  } catch(err) {
    console.log('error', err)
    await promiseStopClient()
  }
}

module.exports = { 
  save,
  // exists,
  findById,
  findByUserId,
}