export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            authors: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                    url: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                    url: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                    url?: string;
                };
                Relationships: [];
            };
            book_authors: {
                Row: {
                    author_id: number | null;
                    book_id: number | null;
                    created_at: string;
                    id: number;
                };
                Insert: {
                    author_id?: number | null;
                    book_id?: number | null;
                    created_at?: string;
                    id?: number;
                };
                Update: {
                    author_id?: number | null;
                    book_id?: number | null;
                    created_at?: string;
                    id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: 'book_authors_author_id_fkey';
                        columns: ['author_id'];
                        isOneToOne: false;
                        referencedRelation: 'authors';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'book_authors_book_id_fkey';
                        columns: ['book_id'];
                        isOneToOne: false;
                        referencedRelation: 'books';
                        referencedColumns: ['id'];
                    }
                ];
            };
            book_genres: {
                Row: {
                    book_id: number | null;
                    book_id_genre_id: string;
                    created_at: string;
                    genre_id: number | null;
                    id: number;
                };
                Insert: {
                    book_id?: number | null;
                    book_id_genre_id: string;
                    created_at?: string;
                    genre_id?: number | null;
                    id?: number;
                };
                Update: {
                    book_id?: number | null;
                    book_id_genre_id?: string;
                    created_at?: string;
                    genre_id?: number | null;
                    id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: 'book_genere_book_id_fkey';
                        columns: ['book_id'];
                        isOneToOne: false;
                        referencedRelation: 'books';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'book_genere_genre_id_fkey';
                        columns: ['genre_id'];
                        isOneToOne: false;
                        referencedRelation: 'genres';
                        referencedColumns: ['id'];
                    }
                ];
            };
            book_tags: {
                Row: {
                    book_id: number;
                    created_at: string;
                    id: number;
                    tag_id: number;
                };
                Insert: {
                    book_id: number;
                    created_at?: string;
                    id?: number;
                    tag_id: number;
                };
                Update: {
                    book_id?: number;
                    created_at?: string;
                    id?: number;
                    tag_id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: 'book_tag_book_id_fkey';
                        columns: ['book_id'];
                        isOneToOne: false;
                        referencedRelation: 'books';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'book_tag_tag_id_fkey';
                        columns: ['tag_id'];
                        isOneToOne: false;
                        referencedRelation: 'tags';
                        referencedColumns: ['id'];
                    }
                ];
            };
            books: {
                Row: {
                    authors: string;
                    created_at: string;
                    description: string | null;
                    good_reads_book_id: string | null;
                    good_reads_description: string | null;
                    good_reads_image_url: string | null;
                    good_reads_rating: number | null;
                    good_reads_rating_count: number | null;
                    google_books_id: string | null;
                    google_details_link: string | null;
                    google_rating: number | null;
                    id: number;
                    isbn: string;
                    num_pages: number | null;
                    published_date: string | null;
                    publisher: string | null;
                    series_name: string | null;
                    title: string;
                };
                Insert: {
                    authors: string;
                    created_at?: string;
                    description?: string | null;
                    good_reads_book_id?: string | null;
                    good_reads_description?: string | null;
                    good_reads_image_url?: string | null;
                    good_reads_rating?: number | null;
                    good_reads_rating_count?: number | null;
                    google_books_id?: string | null;
                    google_details_link?: string | null;
                    google_rating?: number | null;
                    id?: number;
                    isbn: string;
                    num_pages?: number | null;
                    published_date?: string | null;
                    publisher?: string | null;
                    series_name?: string | null;
                    title: string;
                };
                Update: {
                    authors?: string;
                    created_at?: string;
                    description?: string | null;
                    good_reads_book_id?: string | null;
                    good_reads_description?: string | null;
                    good_reads_image_url?: string | null;
                    good_reads_rating?: number | null;
                    good_reads_rating_count?: number | null;
                    google_books_id?: string | null;
                    google_details_link?: string | null;
                    google_rating?: number | null;
                    id?: number;
                    isbn?: string;
                    num_pages?: number | null;
                    published_date?: string | null;
                    publisher?: string | null;
                    series_name?: string | null;
                    title?: string;
                };
                Relationships: [];
            };
            genres: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                };
                Relationships: [];
            };
            profiles: {
                Row: {
                    avatar_url: string | null;
                    full_name: string | null;
                    id: string;
                    updated_at: string | null;
                    username: string | null;
                    website: string | null;
                };
                Insert: {
                    avatar_url?: string | null;
                    full_name?: string | null;
                    id: string;
                    updated_at?: string | null;
                    username?: string | null;
                    website?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    full_name?: string | null;
                    id?: string;
                    updated_at?: string | null;
                    username?: string | null;
                    website?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'profiles_id_fkey';
                        columns: ['id'];
                        isOneToOne: true;
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    }
                ];
            };
            tags: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                };
                Relationships: [];
            };
            user_scans: {
                Row: {
                    book_id: number;
                    created_at: string;
                    id: number;
                    user_id: string;
                };
                Insert: {
                    book_id: number;
                    created_at?: string;
                    id?: number;
                    user_id: string;
                };
                Update: {
                    book_id?: number;
                    created_at?: string;
                    id?: number;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'user_scans_book_id_fkey';
                        columns: ['book_id'];
                        isOneToOne: false;
                        referencedRelation: 'books';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'user_scans_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'profiles';
                        referencedColumns: ['id'];
                    }
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
            PublicSchema['Views'])
      ? (PublicSchema['Tables'] &
            PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema['Enums']
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
      ? PublicSchema['Enums'][PublicEnumNameOrOptions]
      : never;
