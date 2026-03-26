const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("barInventory");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});