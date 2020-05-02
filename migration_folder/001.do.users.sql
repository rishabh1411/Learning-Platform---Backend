CREATE TABLE mydb.users (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  mobile_number VARCHAR(12),
  gender VARCHAR(10),
  dob VARCHAR(20),  
  active BOOLEAN DEFAULT true
)