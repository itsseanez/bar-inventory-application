const { Router } = require("express");
const router = Router();

const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getInventory);

router.get("/categories", inventoryController.getCategories);
router.post("/categories", inventoryController.addCategory);
router.delete("/categories/:id", inventoryController.deleteCategory);
router.put("/categories/:id", inventoryController.editCategory);

router.get("/items", inventoryController.getItems);
router.post("/items", inventoryController.addItem);
router.delete("/items/:id", inventoryController.deleteItem);
router.put("/items/:id", inventoryController.editItem);

router.get("/subcategories", inventoryController.getSubCategories);
router.post("/subcategories", inventoryController.addSubCategory);
router.delete("/subcategories/:id", inventoryController.deleteSubCategory);
router.put("/subcategories/:id", inventoryController.editSubCategory);

module.exports = router;