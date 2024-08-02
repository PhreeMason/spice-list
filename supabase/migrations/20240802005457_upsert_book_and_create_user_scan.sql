CREATE OR REPLACE FUNCTION public.upsert_book_and_create_user_scan(
  p_user_id UUID,
  p_book_data JSONB
)
RETURNS TABLE (
  book_id INT,
  is_new BOOLEAN
) AS $$
DECLARE
  v_book_id INT;
  v_is_new BOOLEAN;
BEGIN
  -- Check if the book exists
  SELECT id INTO v_book_id FROM books WHERE isbn = (p_book_data->>'isbn');
  
  IF v_book_id IS NULL THEN
    -- Insert new book
    INSERT INTO books (
      isbn,
      title,
      authors,
      description,
      num_pages,
      published_date,
      publisher,
      good_reads_book_id,
      good_reads_description,
      good_reads_image_url,
      good_reads_rating,
      good_reads_rating_count,
      google_books_id,
      google_details_link
    ) VALUES (
      p_book_data->>'isbn',
      p_book_data->>'title',
      p_book_data->>'authors',
      p_book_data->>'description',
      (p_book_data->>'num_pages')::INT,
      p_book_data->>'published_date',
      p_book_data->>'publisher',
      p_book_data->>'good_reads_book_id',
      p_book_data->>'good_reads_description',
      p_book_data->>'good_reads_image_url',
      (p_book_data->>'good_reads_rating')::NUMERIC,
      (p_book_data->>'good_reads_rating_count')::INT,
      p_book_data->>'google_books_id',
      p_book_data->>'google_details_link'
    ) RETURNING id INTO v_book_id;
    v_is_new := TRUE;
  ELSE
    -- Update existing book
    UPDATE books SET
      title = p_book_data->>'title',
      authors = p_book_data->>'authors',
      description = p_book_data->>'description',
      num_pages = (p_book_data->>'num_pages')::INT,
      published_date = p_book_data->>'published_date',
      publisher = p_book_data->>'publisher',
      good_reads_book_id = p_book_data->>'good_reads_book_id',
      good_reads_description = p_book_data->>'good_reads_description',
      good_reads_image_url = p_book_data->>'good_reads_image_url',
      good_reads_rating = (p_book_data->>'good_reads_rating')::NUMERIC,
      good_reads_rating_count = (p_book_data->>'good_reads_rating_count')::INT,
      google_books_id = p_book_data->>'google_books_id',
      google_details_link = p_book_data->>'google_details_link'
    WHERE id = v_book_id;
    v_is_new := FALSE;
  END IF;

  -- Create user scan
  INSERT INTO user_scans (user_id, book_id)
  VALUES (p_user_id, v_book_id)
  ON CONFLICT (user_id, book_id) DO NOTHING;

  RETURN QUERY SELECT v_book_id, v_is_new;
END;
$$
 LANGUAGE plpgsql;
