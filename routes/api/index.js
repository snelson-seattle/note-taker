const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/notes", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../../db/db.json"),
    "utf-8",
    (error, data) => {
      if (error) {
        res.status(500).json({ error: error });
      } else {
        const notes = JSON.parse(data);
        res.status(200).json(notes);
      }
    }
  );
});

router.post("/notes", (req, res) => {
  res.status(201).json({ message: "success" });
});

module.exports = router;
