CREATE OR REPLACE FUNCTION public.upload_book_and_genres(
  p_isbn TEXT,
  p_authors TEXT,
  p_description TEXT,
  p_good_reads_book_id TEXT,
  p_good_reads_image_url TEXT,
  p_good_reads_rating_count INTEGER,
  p_good_reads_rating NUMERIC,
  p_num_pages INTEGER,
  p_published_date DATE,
  p_publisher TEXT,
  p_title TEXT,
  p_genres TEXT[]
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_book_id INT;
  v_genre_id INT;
  v_genre TEXT;
  v_book JSONB;
BEGIN
  -- 1. Upsert book data
  INSERT INTO public.books (
    isbn, authors, description, good_reads_book_id, good_reads_image_url,
    good_reads_rating_count, good_reads_rating, num_pages, published_date,
    publisher, title
  ) VALUES (
    p_isbn, p_authors, p_description, p_good_reads_book_id, p_good_reads_image_url,
    p_good_reads_rating_count, p_good_reads_rating, p_num_pages, p_published_date,
    p_publisher, p_title
  )
  ON CONFLICT (isbn) DO UPDATE SET
    authors = EXCLUDED.authors,
    description = EXCLUDED.description,
    good_reads_book_id = EXCLUDED.good_reads_book_id,
    good_reads_image_url = EXCLUDED.good_reads_image_url,
    good_reads_rating_count = EXCLUDED.good_reads_rating_count,
    good_reads_rating = EXCLUDED.good_reads_rating,
    num_pages = EXCLUDED.num_pages,
    published_date = EXCLUDED.published_date,
    publisher = EXCLUDED.publisher,
    title = EXCLUDED.title
  RETURNING id INTO v_book_id;

  -- 2. Process genres
  FOREACH v_genre IN ARRAY p_genres
  LOOP
    -- Insert new genre if it doesn't exist
    INSERT INTO public.genres (name)
    VALUES (v_genre)
    ON CONFLICT (name) DO NOTHING;

    -- Get genre id
    SELECT id INTO v_genre_id FROM public.genres WHERE name = v_genre;

    -- Link book to genre
    INSERT INTO public.book_genres (book_id, genre_id, book_id_genre_id)
    VALUES (v_book_id, v_genre_id, v_book_id || '_' || v_genre_id)
    ON CONFLICT (book_id_genre_id) DO NOTHING;
  END LOOP;

  -- 3. Return the inserted/updated book
  SELECT row_to_json(b)::jsonb INTO v_book
  FROM public.books b
  WHERE b.id = v_book_id;

  RETURN v_book;
END;
$$
;
