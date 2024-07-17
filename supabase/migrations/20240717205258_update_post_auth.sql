CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- First, insert the profile
  INSERT INTO public.profiles (id, full_name, avatar_url, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'username');

  -- Then, insert the bookshelves
  INSERT INTO public.bookshelves (user_id, name)
  VALUES
    (NEW.id, 'read'),
    (NEW.id, 'to-read'),
    (NEW.id, 'reading');

  RETURN NEW;
END;
$$;