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
    const cleanSubcategory = subcategory || null;
    try {
        await db.addItem(name, category, cleanSubcategory, quantity);
        res.redirect("/items");
    } catch (err) {
        console.error("Error adding item:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function addCategory(req, res) {
    const { name } = req.body;
    try {
        await db.addCategory(name);
        res.redirect("/categories");
    } catch (err) {
        console.error("Error adding category:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function addSubCategory(req, res) {
    const { name, category } = req.body;
    try {
        await db.addSubCategory(name, category);
        res.redirect("/subcategories");
    } catch (err) {
        console.error("Error adding subcategory:", err);
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
        const categories = await db.getAllCategories();
        const subcategories = await db.getAllSubCategories();
        res.render("items", { items, categories, subcategories });
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function getSubCategories(req, res) {
    try {
        const subcategories = await db.getAllSubCategories();
        const categories = await db.getAllCategories();
        res.render("subcategories", { subcategories, categories });
    } catch (err) {
        console.error("Error fetching subcategories:", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getInventory,
    addItem,
    getCategories,
    getItems,
    getSubCategories,
    addCategory,
    addSubCategory

};