const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Menyajikan file statis (HTML, CSS) dari folder 'public'
app.use(express.static("public"));

// Route dasar
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Menyalakan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Your Task Management System is ready!");
});
