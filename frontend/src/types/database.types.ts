export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never;
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            graphql: {
                Args: {
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                    extensions?: Json;
                };
                Returns: Json;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
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
                    },
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
                    },
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
                    },
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
            bookshelf_books: {
                Row: {
                    bookshelf_id: number | null;
                    created_at: string;
                    id: number;
                    user_book_id: number | null;
                };
                Insert: {
                    bookshelf_id?: number | null;
                    created_at?: string;
                    id?: number;
                    user_book_id?: number | null;
                };
                Update: {
                    bookshelf_id?: number | null;
                    created_at?: string;
                    id?: number;
                    user_book_id?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'bookshelf_books_bookshelf_id_fkey';
                        columns: ['bookshelf_id'];
                        isOneToOne: false;
                        referencedRelation: 'bookshelves';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'bookshelf_books_user_book_id_fkey';
                        columns: ['user_book_id'];
                        isOneToOne: false;
                        referencedRelation: 'user_books';
                        referencedColumns: ['id'];
                    },
                ];
            };
            bookshelves: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'bookshelves_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'profiles';
                        referencedColumns: ['id'];
                    },
                ];
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
                    },
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
            user_books: {
                Row: {
                    book_id: number;
                    created_at: string;
                    date_added: string | null;
                    date_read: string | null;
                    exclusive_shelf: string;
                    id: number;
                    my_rating: number | null;
                    my_review: string | null;
                    owned_copies: number | null;
                    read_count: number | null;
                    user_id: string;
                };
                Insert: {
                    book_id: number;
                    created_at?: string;
                    date_added?: string | null;
                    date_read?: string | null;
                    exclusive_shelf?: string;
                    id?: number;
                    my_rating?: number | null;
                    my_review?: string | null;
                    owned_copies?: number | null;
                    read_count?: number | null;
                    user_id: string;
                };
                Update: {
                    book_id?: number;
                    created_at?: string;
                    date_added?: string | null;
                    date_read?: string | null;
                    exclusive_shelf?: string;
                    id?: number;
                    my_rating?: number | null;
                    my_review?: string | null;
                    owned_copies?: number | null;
                    read_count?: number | null;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'user_books_book_id_fkey';
                        columns: ['book_id'];
                        isOneToOne: false;
                        referencedRelation: 'books';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'user_books_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'profiles';
                        referencedColumns: ['id'];
                    },
                ];
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
                    },
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
    storage: {
        Tables: {
            buckets: {
                Row: {
                    allowed_mime_types: string[] | null;
                    avif_autodetection: boolean | null;
                    created_at: string | null;
                    file_size_limit: number | null;
                    id: string;
                    name: string;
                    owner: string | null;
                    owner_id: string | null;
                    public: boolean | null;
                    updated_at: string | null;
                };
                Insert: {
                    allowed_mime_types?: string[] | null;
                    avif_autodetection?: boolean | null;
                    created_at?: string | null;
                    file_size_limit?: number | null;
                    id: string;
                    name: string;
                    owner?: string | null;
                    owner_id?: string | null;
                    public?: boolean | null;
                    updated_at?: string | null;
                };
                Update: {
                    allowed_mime_types?: string[] | null;
                    avif_autodetection?: boolean | null;
                    created_at?: string | null;
                    file_size_limit?: number | null;
                    id?: string;
                    name?: string;
                    owner?: string | null;
                    owner_id?: string | null;
                    public?: boolean | null;
                    updated_at?: string | null;
                };
                Relationships: [];
            };
            migrations: {
                Row: {
                    executed_at: string | null;
                    hash: string;
                    id: number;
                    name: string;
                };
                Insert: {
                    executed_at?: string | null;
                    hash: string;
                    id: number;
                    name: string;
                };
                Update: {
                    executed_at?: string | null;
                    hash?: string;
                    id?: number;
                    name?: string;
                };
                Relationships: [];
            };
            objects: {
                Row: {
                    bucket_id: string | null;
                    created_at: string | null;
                    id: string;
                    last_accessed_at: string | null;
                    metadata: Json | null;
                    name: string | null;
                    owner: string | null;
                    owner_id: string | null;
                    path_tokens: string[] | null;
                    updated_at: string | null;
                    version: string | null;
                };
                Insert: {
                    bucket_id?: string | null;
                    created_at?: string | null;
                    id?: string;
                    last_accessed_at?: string | null;
                    metadata?: Json | null;
                    name?: string | null;
                    owner?: string | null;
                    owner_id?: string | null;
                    path_tokens?: string[] | null;
                    updated_at?: string | null;
                    version?: string | null;
                };
                Update: {
                    bucket_id?: string | null;
                    created_at?: string | null;
                    id?: string;
                    last_accessed_at?: string | null;
                    metadata?: Json | null;
                    name?: string | null;
                    owner?: string | null;
                    owner_id?: string | null;
                    path_tokens?: string[] | null;
                    updated_at?: string | null;
                    version?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'objects_bucketId_fkey';
                        columns: ['bucket_id'];
                        isOneToOne: false;
                        referencedRelation: 'buckets';
                        referencedColumns: ['id'];
                    },
                ];
            };
            s3_multipart_uploads: {
                Row: {
                    bucket_id: string;
                    created_at: string;
                    id: string;
                    in_progress_size: number;
                    key: string;
                    owner_id: string | null;
                    upload_signature: string;
                    version: string;
                };
                Insert: {
                    bucket_id: string;
                    created_at?: string;
                    id: string;
                    in_progress_size?: number;
                    key: string;
                    owner_id?: string | null;
                    upload_signature: string;
                    version: string;
                };
                Update: {
                    bucket_id?: string;
                    created_at?: string;
                    id?: string;
                    in_progress_size?: number;
                    key?: string;
                    owner_id?: string | null;
                    upload_signature?: string;
                    version?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 's3_multipart_uploads_bucket_id_fkey';
                        columns: ['bucket_id'];
                        isOneToOne: false;
                        referencedRelation: 'buckets';
                        referencedColumns: ['id'];
                    },
                ];
            };
            s3_multipart_uploads_parts: {
                Row: {
                    bucket_id: string;
                    created_at: string;
                    etag: string;
                    id: string;
                    key: string;
                    owner_id: string | null;
                    part_number: number;
                    size: number;
                    upload_id: string;
                    version: string;
                };
                Insert: {
                    bucket_id: string;
                    created_at?: string;
                    etag: string;
                    id?: string;
                    key: string;
                    owner_id?: string | null;
                    part_number: number;
                    size?: number;
                    upload_id: string;
                    version: string;
                };
                Update: {
                    bucket_id?: string;
                    created_at?: string;
                    etag?: string;
                    id?: string;
                    key?: string;
                    owner_id?: string | null;
                    part_number?: number;
                    size?: number;
                    upload_id?: string;
                    version?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 's3_multipart_uploads_parts_bucket_id_fkey';
                        columns: ['bucket_id'];
                        isOneToOne: false;
                        referencedRelation: 'buckets';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 's3_multipart_uploads_parts_upload_id_fkey';
                        columns: ['upload_id'];
                        isOneToOne: false;
                        referencedRelation: 's3_multipart_uploads';
                        referencedColumns: ['id'];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            can_insert_object: {
                Args: {
                    bucketid: string;
                    name: string;
                    owner: string;
                    metadata: Json;
                };
                Returns: undefined;
            };
            extension: {
                Args: {
                    name: string;
                };
                Returns: string;
            };
            filename: {
                Args: {
                    name: string;
                };
                Returns: string;
            };
            foldername: {
                Args: {
                    name: string;
                };
                Returns: string[];
            };
            get_size_by_bucket: {
                Args: Record<PropertyKey, never>;
                Returns: {
                    size: number;
                    bucket_id: string;
                }[];
            };
            list_multipart_uploads_with_delimiter: {
                Args: {
                    bucket_id: string;
                    prefix_param: string;
                    delimiter_param: string;
                    max_keys?: number;
                    next_key_token?: string;
                    next_upload_token?: string;
                };
                Returns: {
                    key: string;
                    id: string;
                    created_at: string;
                }[];
            };
            list_objects_with_delimiter: {
                Args: {
                    bucket_id: string;
                    prefix_param: string;
                    delimiter_param: string;
                    max_keys?: number;
                    start_after?: string;
                    next_token?: string;
                };
                Returns: {
                    name: string;
                    id: string;
                    metadata: Json;
                    updated_at: string;
                }[];
            };
            operation: {
                Args: Record<PropertyKey, never>;
                Returns: string;
            };
            search: {
                Args: {
                    prefix: string;
                    bucketname: string;
                    limits?: number;
                    levels?: number;
                    offsets?: number;
                    search?: string;
                    sortcolumn?: string;
                    sortorder?: string;
                };
                Returns: {
                    name: string;
                    id: string;
                    updated_at: string;
                    created_at: string;
                    last_accessed_at: string;
                    metadata: Json;
                }[];
            };
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
        : never = never,
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
        : never = never,
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
        : never = never,
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
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
      ? PublicSchema['Enums'][PublicEnumNameOrOptions]
      : never;
