const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

const inventoryRouter = require("./routes/inventoryRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/", inventoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});