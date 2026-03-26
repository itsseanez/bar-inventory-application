const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query(`SELECT 
    items.name,
    categories.name AS category,
    subcategories.name AS subcategory,
    items.quantity
    FROM items
    LEFT JOIN categories ON items.category_id = categories.id
    LEFT JOIN subcategories ON items.subcategory_id = subcategories.id;`);
  return rows;
}

async function insertItem(name, category, subcategory, quantity) {
  await pool.query("INSERT INTO items (name, category, subcategory, quantity) VALUES ($1, $2, $3, $4)", [name, category, subcategory, quantity]);
}

module.exports = {
  getAllItems,
  insertItem
};