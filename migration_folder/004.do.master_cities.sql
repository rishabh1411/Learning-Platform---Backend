CREATE TABLE mydb.master_cities (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(255),
  description VARCHAR(255),
  active BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,
  master_state_id INT,
  FOREIGN KEY (master_state_id) REFERENCES master_states(id)
)