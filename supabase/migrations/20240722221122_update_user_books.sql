CREATE UNIQUE INDEX idx_user_books_user_id_book_id 
ON user_books (user_id, book_id);