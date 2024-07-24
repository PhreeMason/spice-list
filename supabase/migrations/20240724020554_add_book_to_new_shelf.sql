CREATE OR REPLACE FUNCTION add_book_to_new_shelf(
  p_book_id INT,
  p_shelf_name TEXT,
  p_user_id UUID
) RETURNS VOID AS $$
DECLARE
  v_bookshelf_id INT;
  v_user_book_id INT;
BEGIN
  -- Create new bookshelf
  INSERT INTO bookshelves (name, user_id)
  VALUES (p_shelf_name, p_user_id)
  RETURNING id INTO v_bookshelf_id;

  -- Get or create user_book
  INSERT INTO user_books (book_id, user_id, exclusive_shelf)
  VALUES (p_book_id, p_user_id, 'to-read')
  ON CONFLICT (book_id, user_id) 
  DO UPDATE SET 
    -- Update other fields if needed, but not exclusive_shelf
    book_id = EXCLUDED.book_id,
    user_id = EXCLUDED.user_id
  RETURNING id INTO v_user_book_id;

  -- Add book to new bookshelf
  INSERT INTO bookshelf_books (bookshelf_id, user_book_id)
  VALUES (v_bookshelf_id, v_user_book_id)
  ON CONFLICT DO NOTHING;
END;
$$
 LANGUAGE plpgsql;