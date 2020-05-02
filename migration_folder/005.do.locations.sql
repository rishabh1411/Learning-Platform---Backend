CREATE TABLE mydb.locations (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  address VARCHAR(255),
  pincode INT(6),
  active BOOLEAN DEFAULT true,
  google_map_latitude FLOAT,
  google_map_longitude FLOAT,
  master_city_id INT,
  user_id INT,
  FOREIGN KEY (master_city_id) REFERENCES master_cities(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
)