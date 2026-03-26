const { Router } = require("express");
const router = Router();

const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getInventory);

router.get("/categories", inventoryController.getCategories);
router.post("/categories", inventoryController.addCategory);

router.get("/items", inventoryController.getItems);
router.post("/items", inventoryController.addItem);

router.get("/subcategories", inventoryController.getSubCategories);
router.post("/subcategories", inventoryController.addSubCategory);

module.exports = router;