require("dotenv").config();
const { Client } = require("pg");

const SQL = `
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS subcategories;
    DROP TABLE IF EXISTS categories;

    CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE subcategories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    quantity INTEGER DEFAULT 0,
    category_id INTEGER REFERENCES categories(id),
    subcategory_id INTEGER REFERENCES subcategories(id)
    );

    INSERT INTO categories (name) VALUES
    ('Tequila'),
    ('Vodka'),
    ('Whiskey'),
    ('Rum'),
    ('Gin'),
    ('Beer'),
    ('Wine'),
    ('Cognac/Cordials');

    INSERT INTO subcategories (name, category_id) VALUES
    ('Blanco', 1),
    ('Reposado', 1),
    ('Añejo', 1);

    --Tequila
    INSERT INTO items (name, quantity, category_id, subcategory_id) VALUES
    ('Don Julio Blanco', 12, 1, 1),
    ('Patrón Silver', 10, 1, 1),
    ('Espolòn Blanco', 15, 1, 1),
    ('Casamigos Blanco', 8, 1, 1);

    INSERT INTO items (name, quantity, category_id, subcategory_id) VALUES
    ('Don Julio Reposado', 9, 1, 2),
    ('Patrón Reposado', 3, 1, 2),
    ('Casamigos Reposado', 7, 1, 2),
    ('Herradura Reposado', 6, 1, 2),
    ('1800 Reposado', 11, 1, 2);

    INSERT INTO items (name, quantity, category_id, subcategory_id) VALUES
    ('Don Julio Añejo', 5, 1, 3),
    ('Clase Azul Añejo', 2, 1, 3),
    ('Patrón Añejo', 4, 1, 3);

    --Vodka
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Tito''s Vodka', 14, 2),
    ('Smirnoff', 10, 2),
    ('Grey Goose', 6, 2);

    --Whiskey
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Jack Daniels', 10, 3),
    ('Woodford Reserve', 3, 3),
    ('Jameson', 8, 3);

    --Rum
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Bacardi Silver', 12, 4),
    ('Bounty', 7, 4),
    ('Captain Morgan', 9, 4);

    --Gin
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Bombay Sapphire', 7, 5),
    ('Tanqueray', 6, 5);

    --Beer
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Bud Light', 20, 6),
    ('Coors Light', 18, 6),
    ('Corona', 15, 6);

    --Wine
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Cabernet Sauvignon', 10, 7),
    ('Chardonnay', 8, 7),
    ('Pinot Noir', 5, 7);

    --Cognac/Cordials
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Hennessy V.S.', 7, 8),
    ('Gran Marnier', 5, 8);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main().catch(err => {
  console.error("UNHANDLED ERROR:", err);
});