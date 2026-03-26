const db = require("../db/queries");

async function getInventory(req, res) {
    try {
        const inventory = await db.getInventory();
        res.render("barInventory", { inventory });
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send("Internal Server Error");
    }  
}

async function addItem(req, res) {
    const { name, category, subcategory, quantity } = req.body;
    if (!subcategory) subcategory = null;
    try {
        await db.insertItem(name, category, subcategory, quantity);
        res.redirect("/");
    } catch (err) {
        console.error("Error adding item:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function getCategories(req, res) {
    try {
        const categories = await db.getAllCategories();
        res.render("categories", { categories });
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).send("Internal Server Error");
    }
}   

async function getItems(req, res) {
    try {
        const items = await db.getAllItems();
        res.render("items", { items });
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getInventory,
    addItem,
    getCategories,
    getItems
};