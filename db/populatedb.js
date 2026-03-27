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
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    subcategory_id INTEGER REFERENCES subcategories(id) ON DELETE CASCADE
    );

    INSERT INTO categories (name) VALUES
    ('Beer'),
    ('Wine'),
    ('Tequila'),
    ('Vodka'),
    ('Whiskey'),
    ('Rum'),
    ('Gin'),
    ('Cognac/Cordials');

    INSERT INTO subcategories (name, category_id) VALUES
    ('Blanco', 3),
    ('Reposado', 3),
    ('Añejo', 3);

    --Beer
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Bud Light', 20, 1),
    ('Coors Light', 18, 1),
    ('Corona', 15, 1);

    --Wine
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Cabernet Sauvignon', 10, 2),
    ('Chardonnay', 8, 2),
    ('Pinot Noir', 5, 2);

    --Tequila
    INSERT INTO items (name, quantity, category_id, subcategory_id) VALUES
    ('Don Julio Blanco', 12, 3, 1),
    ('Patrón Silver', 10, 3, 1),
    ('Espolòn Blanco', 15, 3, 1),
    ('Casamigos Blanco', 8, 3, 1);

    INSERT INTO items (name, quantity, category_id, subcategory_id) VALUES
    ('Don Julio Reposado', 9, 3, 2),
    ('Patrón Reposado', 3, 3, 2),
    ('Casamigos Reposado', 7, 3, 2),
    ('Herradura Reposado', 6, 3, 2),
    ('1800 Reposado', 11, 3, 2);

    INSERT INTO items (name, quantity, category_id, subcategory_id) VALUES
    ('Don Julio Añejo', 5, 3, 3),
    ('Clase Azul Añejo', 2, 3, 3),
    ('Patrón Añejo', 4, 3, 3);

    --Vodka
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Tito''s Vodka', 14, 4),
    ('Smirnoff', 10, 4),
    ('Grey Goose', 6, 4);

    --Whiskey
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Jack Daniels', 10, 5),
    ('Woodford Reserve', 3, 5),
    ('Jameson', 8, 5);

    --Rum
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Bacardi Silver', 12, 6),
    ('Bounty', 7, 6),
    ('Captain Morgan', 9, 6);

    --Gin
    INSERT INTO items (name, quantity, category_id) VALUES
    ('Bombay Sapphire', 7, 7),
    ('Tanqueray', 6, 7),
    ('Hendrick''s', 5, 7);

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