const router = require("express").Router();

router.get("/notes", (req, res) => {
  res.status(200).json({ message: "success" });
});

router.post("/notes", (req, res) => {
  res.status(201).json({ message: "success" });
});

module.exports = router;
