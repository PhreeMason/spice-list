alter table "public"."user_books" drop column "date_added";

alter table "public"."user_books" drop column "date_read";

alter table "public"."user_books" add column "end_date" date;

alter table "public"."user_books" add column "start_date" date;


