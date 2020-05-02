CREATE TABLE mydb.master_states (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(255),
  description VARCHAR(255),
  active BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,
  master_country_id INT,
  FOREIGN KEY (master_country_id) REFERENCES master_countries(id)
)