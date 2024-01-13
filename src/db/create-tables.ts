import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` + "?sslmode=require",
});

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        UserID SERIAL PRIMARY KEY,
        Username VARCHAR(50) UNIQUE NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Email VARCHAR(100) UNIQUE NOT NULL,
        FullName VARCHAR(100) NOT NULL,
        Membership VARCHAR(10) CHECK (Membership IN ('Premium', 'Normal')) NOT NULL DEFAULT 'Normal',
        CreatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        CategoryID SERIAL PRIMARY KEY,
        Name VARCHAR(50) NOT NULL UNIQUE,
        Description TEXT,
        Activated BOOLEAN NOT NULL DEFAULT TRUE,
        CreatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        PostID SERIAL PRIMARY KEY,
        Title VARCHAR(100) NOT NULL,
        Body TEXT NOT NULL,
        CategoryID INTEGER REFERENCES categories(CategoryID),
        Status VARCHAR(20) CHECK (Status IN ('Draft', 'Published', 'Pending Review')) NOT NULL DEFAULT 'Draft',
        Label VARCHAR(10) CHECK (Label IN ('Normal', 'Premium')) NOT NULL DEFAULT 'Normal',
        CreatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        PaymentID VARCHAR(50) PRIMARY KEY,
        Amount DECIMAL(10,2) NOT NULL,
        PaymentMethod VARCHAR(50) NOT NULL,
        Status VARCHAR(50) NOT NULL,
        CreatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    console.log('Tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables();
