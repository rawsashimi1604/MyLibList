-- Connect to postgres database first...
\c postgres;

-- Auto destroy defaultdb on start.
DROP DATABASE IF EXISTS defaultdb;

-- Create the database
CREATE DATABASE defaultdb;

-- Connect to the database
\c defaultdb;

-- CREATE TABLE IF NOT EXISTSs
CREATE TABLE IF NOT EXISTS "user"
(
  username VARCHAR(16) PRIMARY KEY,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS "refresh_token"
(
  token VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS "vehicle"
(
  id BIGSERIAL PRIMARY KEY,
  "name" TEXT
);

-- Seed data into tables
INSERT INTO vehicle("name")
VALUES 
('Audi'), 
('Honda'), 
('BMW');


CREATE TABLE IF NOT EXISTS "users"(
    email VARCHAR(128) PRIMARY KEY,
    password VARCHAR(64) NOT NULL,
    timestamp_registered TIMESTAMP WITH TIME ZONE NOT NULL,
    access_role VARCHAR(256) NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS "books"( -- Check excel file after for data type
    book_uuid UUID PRIMARY KEY,
    access_rights TEXT,
    rights TEXT,
    abstract TEXT,
    title TEXT,
    uri TEXT,
    date_created TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS "reading_lists"( -- on delete cascade
    reading_list_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    timestamp_created_on TIMESTAMP WITH TIME ZONE NOT NULL,
    email VARCHAR(128),
    FOREIGN KEY (email) 
        REFERENCES "users"(email) 
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "books_lists"(
    reading_list_id BIGSERIAL,
    book_uuid UUID,
    timestamp_created_on TIMESTAMP WITH TIME ZONE NOT NULL,
    FOREIGN KEY (reading_list_id) 
        REFERENCES "reading_lists"(reading_list_id)
        ON DELETE CASCADE,
    FOREIGN KEY (book_uuid)
        REFERENCES "books"(book_uuid) 
        ON DELETE CASCADE,
    PRIMARY KEY (reading_list_id, book_uuid)
);

CREATE TABLE IF NOT EXISTS "books_users_likes"( 
    email VARCHAR(128),
    book_uuid UUID,
    timestamp_liked TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY(email)
        REFERENCES "users"(email)
        ON DELETE CASCADE,
    FOREIGN KEY(book_uuid)
        REFERENCES "books"(book_uuid)
        ON DELETE CASCADE,
    PRIMARY KEY (email, book_uuid)
);

CREATE TABLE IF NOT EXISTS "users_bookmarks"(
    email VARCHAR(128),
    book_uuid UUID,
    page INT NOT NULL,
    timestamp_bookmarked TIMESTAMP WITH TIME ZONE NOT NULL,
    FOREIGN KEY(email)
        REFERENCES "users"(email)
        ON DELETE CASCADE,
    FOREIGN KEY(book_uuid)
        REFERENCES "books"(book_uuid)
        ON DELETE CASCADE,    
    PRIMARY KEY (email,book_uuid)
);

CREATE TABLE IF NOT EXISTS "books_users_status"(
    email VARCHAR(128),
    book_uuid UUID,
    status VARCHAR(16) NOT NULL,
    timestamp_updated TIMESTAMP WITH TIME ZONE NOT NULL,
    FOREIGN KEY(email)
        REFERENCES "users"(email)
        ON DELETE CASCADE,
    FOREIGN KEY(book_uuid)
        REFERENCES "books"(book_uuid)
        ON DELETE CASCADE,    
    PRIMARY KEY (email,book_uuid)
)

CREATE TABLE IF NOT EXISTS "languages"(
    language_id BIGSERIAL PRIMARY KEY,
    language VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS "books_languages"( -- on delete cascade?
    book_uuid UUID,
    language_id BIGSERIAL,
    FOREIGN KEY (book_uuid)
        REFERENCES "books"(book_uuid)
        ON DELETE CASCADE,
    FOREIGN KEY (language_id)
        REFERENCES "languages"(language_id)
        ON DELETE CASCADE,    
    PRIMARY KEY (book_uuid, language_id)
);

CREATE TABLE IF NOT EXISTS "subjects"(
    subject_id BIGSERIAL PRIMARY KEY,
    subject_title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "books_subjects"(
    subject_id BIGSERIAL,
    book_uuid UUID,
    FOREIGN KEY (subject_id)
        REFERENCES "subjects"(subject_id)
        ON DELETE CASCADE,
    FOREIGN KEY (book_uuid)
        REFERENCES "books"(book_uuid)
        ON DELETE CASCADE,    
    PRIMARY KEY (subject_id, book_uuid) 
);

CREATE TABLE IF NOT EXISTS "lcsh"(
    lcsh_id BIGSERIAL PRIMARY KEY,
    lcsh_tag TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "books_lcsh"(
    lcsh_id BIGSERIAL,
    book_uuid UUID,
    FOREIGN KEY (lcsh_id)
        REFERENCES "lcsh"(lcsh_id)
        ON DELETE CASCADE,  
    FOREIGN KEY (book_uuid)
        REFERENCES "books"(book_uuid)
        ON DELETE CASCADE,  
    PRIMARY KEY (lcsh_id, book_uuid)
);

CREATE TABLE IF NOT EXISTS "publishers"(
    publisher_id BIGSERIAL PRIMARY KEY,
    publisher TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "books_published_by"(
    publisher_type VARCHAR(256) NOT NULL,
    publisher_id BIGSERIAL,
    book_uuid UUID,
    FOREIGN KEY (publisher_id)
        REFERENCES "publishers"(publisher_id)
        ON DELETE CASCADE, 
    FOREIGN KEY (book_uuid)
        REFERENCES "books"(book_uuid)
        ON DELETE CASCADE,  
    PRIMARY KEY (publisher_id, book_uuid)
);

CREATE TABLE IF NOT EXISTS "collections"(
    collection_id BIGSERIAL PRIMARY KEY,
    collection_title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "books_in_collections"(
    collection_id BIGSERIAL,
    book_uuid UUID,
    FOREIGN KEY (collection_id)
        REFERENCES "collections"(collection_id)
        ON DELETE CASCADE, 
    FOREIGN KEY (book_uuid)
        REFERENCES "books"(book_uuid)
        ON DELETE CASCADE,      
    PRIMARY KEY (collection_id, book_uuid)
);

CREATE TABLE IF NOT EXISTS "alternative_titles"( -- delete cascade
    alternative_title_id BIGSERIAL PRIMARY KEY,
    alternate_title TEXT NOT NULL,
    book_uuid UUID,
    FOREIGN KEY (book_uuid)
        REFERENCES "books"(book_uuid)
        ON DELETE CASCADE     
);

CREATE TABLE IF NOT EXISTS "contributors"(
    contributor_id BIGSERIAL PRIMARY KEY,
    contributor TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "books_contributors"(
    contributor_id BIGSERIAL,
    book_uuid UUID,
    contributor_type TEXT,
    FOREIGN KEY (contributor_id)
        REFERENCES "contributors"(contributor_id)
        ON DELETE CASCADE,   
    FOREIGN KEY (book_uuid)
        REFERENCES "books"(book_uuid)
        ON DELETE CASCADE,   
    PRIMARY KEY (contributor_id, book_uuid, contributor_type)
);




