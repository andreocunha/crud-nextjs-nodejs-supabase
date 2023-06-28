-- Cria a extensão 'uuid-ossp' se ela ainda não existir
create extension if not exists "uuid-ossp";

create table "public"."user" (
    id uuid not null primary key,
    name TEXT NOT NULL,
    cpf TEXT NOT NULL,
    image TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);
