const { Router } = require("express");
const router = Router();

const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getItems);
router.post("/", inventoryController.addItem);

module.exports = router;