CREATE TABLE mydb.master_user_types (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(255),
  description VARCHAR(255),
  active BOOLEAN DEFAULT true
)