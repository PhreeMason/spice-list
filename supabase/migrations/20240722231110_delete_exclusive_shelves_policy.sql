ALTER TABLE "public"."user_books"
ADD CONSTRAINT exclusive_shelf_check 
CHECK (exclusive_shelf IN ('to-read', 'read', 'reading', 'did-not-finish'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'username');
  RETURN NEW;
END;
$$;