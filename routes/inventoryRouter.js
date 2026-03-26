const { Router } = require("express");
const router = Router();

const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getItems);
router.post("/add", inventoryController.addItem);

module.exports = router;