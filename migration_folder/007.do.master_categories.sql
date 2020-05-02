CREATE TABLE mydb.master_categories (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(255),
  description VARCHAR(255),
  active BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES master_categories(id),
  typeLevel INT(3)
)