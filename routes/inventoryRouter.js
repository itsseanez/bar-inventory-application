const { Router } = require("express");
const router = Router();

const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getInventory);
router.post("/", inventoryController.addItem);

router.get("/categories", inventoryController.getCategories);

router.get("/items", inventoryController.getItems);

router.get("/subcategories", inventoryController.getSubCategories);

module.exports = router;