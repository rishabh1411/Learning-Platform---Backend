CREATE TABLE mydb.users_to_categories (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  user_id INT,
  category_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES master_categories(id)
)