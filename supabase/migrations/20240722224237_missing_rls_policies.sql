-- bookshelves
ALTER TABLE "public"."bookshelves" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookshelves" ON "public"."bookshelves"
FOR SELECT USING ((auth.uid() = user_id));

CREATE POLICY "Users can insert own bookshelves" ON "public"."bookshelves"
FOR INSERT WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can update own bookshelves" ON "public"."bookshelves"
FOR UPDATE USING ((auth.uid() = user_id));

CREATE POLICY "Users can delete own bookshelves" ON "public"."bookshelves"
FOR DELETE USING ((auth.uid() = user_id));

-- bookshelf_books
ALTER TABLE "public"."bookshelf_books" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookshelf_books" ON "public"."bookshelf_books"
FOR SELECT USING ((auth.uid() IN (SELECT user_id FROM bookshelves WHERE id = bookshelf_books.bookshelf_id)));

CREATE POLICY "Users can insert own bookshelf_books" ON "public"."bookshelf_books"
FOR INSERT WITH CHECK ((auth.uid() IN (SELECT user_id FROM bookshelves WHERE id = bookshelf_books.bookshelf_id)));

CREATE POLICY "Users can update own bookshelf_books" ON "public"."bookshelf_books"
FOR UPDATE USING ((auth.uid() IN (SELECT user_id FROM bookshelves WHERE id = bookshelf_books.bookshelf_id)));

CREATE POLICY "Users can delete own bookshelf_books" ON "public"."bookshelf_books"
FOR DELETE USING ((auth.uid() IN (SELECT user_id FROM bookshelves WHERE id = bookshelf_books.bookshelf_id)));


-- user_books
ALTER TABLE "public"."user_books" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own user_books" ON "public"."user_books"
FOR SELECT USING ((auth.uid() = user_id));

CREATE POLICY "Users can insert own user_books" ON "public"."user_books"
FOR INSERT WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can update own user_books" ON "public"."user_books"
FOR UPDATE USING ((auth.uid() = user_id));

CREATE POLICY "Users can delete own user_books" ON "public"."user_books"
FOR DELETE USING ((auth.uid() = user_id));


-- reading_goals
ALTER TABLE "public"."reading_goals" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reading_goals" ON "public"."reading_goals"
FOR SELECT USING ((auth.uid() = user_id));

CREATE POLICY "Users can insert own reading_goals" ON "public"."reading_goals"
FOR INSERT WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can update own reading_goals" ON "public"."reading_goals"
FOR UPDATE USING ((auth.uid() = user_id));

CREATE POLICY "Users can delete own reading_goals" ON "public"."reading_goals"
FOR DELETE USING ((auth.uid() = user_id));


-- reading_sessions
ALTER TABLE "public"."reading_sessions" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reading_sessions" ON "public"."reading_sessions"
FOR SELECT USING ((auth.uid() IN (SELECT user_id FROM user_books WHERE id = reading_sessions.user_book_id)));

CREATE POLICY "Users can insert own reading_sessions" ON "public"."reading_sessions"
FOR INSERT WITH CHECK ((auth.uid() IN (SELECT user_id FROM user_books WHERE id = reading_sessions.user_book_id)));

CREATE POLICY "Users can update own reading_sessions" ON "public"."reading_sessions"
FOR UPDATE USING ((auth.uid() IN (SELECT user_id FROM user_books WHERE id = reading_sessions.user_book_id)));

CREATE POLICY "Users can delete own reading_sessions" ON "public"."reading_sessions"
FOR DELETE USING ((auth.uid() IN (SELECT user_id FROM user_books WHERE id = reading_sessions.user_book_id)));


-- notes
ALTER TABLE "public"."notes" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notes" ON "public"."notes"
FOR SELECT USING ((auth.uid() IN (SELECT user_id FROM user_books WHERE id = notes.user_book_id)));

CREATE POLICY "Users can insert own notes" ON "public"."notes"
FOR INSERT WITH CHECK ((auth.uid() IN (SELECT user_id FROM user_books WHERE id = notes.user_book_id)));

CREATE POLICY "Users can update own notes" ON "public"."notes"
FOR UPDATE USING ((auth.uid() IN (SELECT user_id FROM user_books WHERE id = notes.user_book_id)));

CREATE POLICY "Users can delete own notes" ON "public"."notes"
FOR DELETE USING ((auth.uid() IN (SELECT user_id FROM user_books WHERE id = notes.user_book_id)));
