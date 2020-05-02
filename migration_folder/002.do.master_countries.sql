CREATE TABLE mydb.master_countries (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(255),
  description VARCHAR(255),
  active BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false
)