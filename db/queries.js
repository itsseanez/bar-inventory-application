const pool = require("./pool");

async function getInventory() {
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

async function insertItem(name, categoryName, subcategoryName, quantity) {
    // 1️⃣ Get category ID
    const categoryRes = await pool.query(
        "SELECT id FROM categories WHERE name = $1",
        [categoryName]
    );
    if (categoryRes.rows.length === 0) throw new Error("Category not found");
    const category_id = categoryRes.rows[0].id;

    // 2️⃣ Get subcategory ID (optional)
    let subcategory_id = null;
    if (subcategoryName) {
        const subcategoryRes = await pool.query(
            "SELECT id FROM subcategories WHERE name = $1 AND category_id = $2",
            [subcategoryName, category_id]
        );
        if (subcategoryRes.rows.length > 0) {
            subcategory_id = subcategoryRes.rows[0].id;
        }
    }

    // 3️⃣ Insert into items
    await pool.query(
        "INSERT INTO items (name, quantity, category_id, subcategory_id) VALUES ($1, $2, $3, $4)",
        [name, quantity, category_id, subcategory_id]
    );
}

async function getAllSubCategories() {
    const { rows } = await pool.query("SELECT * FROM subcategories");
    return rows;
}

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function getAllItems() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}

module.exports = {
  getInventory,
  insertItem,
  getAllCategories,
  getAllItems,
  getAllSubCategories
};