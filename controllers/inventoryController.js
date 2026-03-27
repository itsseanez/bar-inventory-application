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
        res.render("categories", { categories, deleteCategory });
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
        res.render("items", { items, categories, subcategories, deleteItem });
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function getSubCategories(req, res) {
    try {
        const subcategories = await db.getAllSubCategories();
        const categories = await db.getAllCategories();
        res.render("subcategories", { subcategories, categories, deleteItem });
    } catch (err) {
        console.error("Error fetching subcategories:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function deleteItem(req, res) {
    const { id } = req.params;
    try {
        await db.deleteItem(id);
        res.sendStatus(200);
    } catch (err) {
        console.error("Error deleting item:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function deleteCategory(req, res) {
    const { id } = req.params;
    try {
        await db.deleteCategory(id);
        res.sendStatus(200);
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function deleteSubCategory(req, res) {
    const { id } = req.params;
    try {
        await db.deleteSubCategory(id);
        res.sendStatus(200);
    } catch (err) {
        console.error("Error deleting subcategory:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function editItem(req, res) {
    const { id } = req.params;
    const { name, quantity } = req.body;
    try {
        await db.editItem(id, name, quantity);
        res.sendStatus(200);
    } catch (err) {
        console.error("Error editing item:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function editCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await db.editCategory(id, name);
        res.sendStatus(200);
    } catch (err) {
        console.error("Error editing category:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function editSubCategory(req, res) {
    const { id } = req.params;
    const { name, category_id } = req.body;
    try {
        await db.editSubCategory(id, name, category_id);
        res.sendStatus(200);
    } catch (err) {
        console.error("Error editing subcategory:", err);
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
    addSubCategory,
    deleteItem,
    deleteCategory,
    deleteSubCategory,
    editItem,
    editCategory,
    editSubCategory
};