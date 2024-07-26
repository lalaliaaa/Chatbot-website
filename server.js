const express = require("express");
const cors = require("cors"); // Tambahkan ini
const app = express();
const path = require("path");

app.use(cors()); // Tambahkan ini
app.use(express.static(path.join(__dirname, "public")));

app.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "intens.json"));
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
