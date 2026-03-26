const db = require("../db/queries");

async function getItems(req, res) {
    try {
        const inventory = await db.getAllItems();
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

module.exports = {
    getItems,
    addItem
};