import type { FastifyInstance } from "fastify"
import fp from "fastify-plugin"
import Database from "better-sqlite3"
import {
    createTransactionHelpers,
    type TransactionHelpers,
} from "./database.transactions"

declare module "fastify" {
    interface FastifyInstance {
        db: Database.Database
        transactions: TransactionHelpers
    }
}

async function databasePluginHelper(fastify: FastifyInstance) {
    const db = new Database("./database.db")
    fastify.log.info("SQLite database connection established.")

    // Create a simple table for testing if it doesn't exist
    db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img_url TEXT NOT NULL,
    caption TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)
    db.exec(`
    CREATE TABLE IF NOT EXISTS reels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_url TEXT NOT NULL,
      thumbnail_url TEXT NOT NULL,
      caption TEXT,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

    db.exec(`
      CREATE TABLE IF NOT EXISTS posts_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts(id)
      );
    `)

    db.exec(`
      CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        is_highlight BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // TABLE FOR STORIES_POSTS
    db.exec(`
      CREATE TABLE IF NOT EXISTS stories_posts (
        story_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        PRIMARY KEY (story_id, post_id),
        FOREIGN KEY (story_id) REFERENCES stories(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
      );
    `)

    // TABLE FOR HIGHLIGHTED STORIES
    const transactions = createTransactionHelpers(db)

    fastify.decorate("db", db)
    fastify.decorate("transactions", transactions)

    fastify.addHook("onClose", (instance, done) => {
        instance.db.close()
        instance.log.info("SQLite database connection closed.")
        done()
    })
}

const databasePlugin = fp(databasePluginHelper)

export { databasePlugin }
