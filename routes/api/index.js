const router = require("express").Router();
const {getNotes, createNote, deleteNote} = require("../../controllers/notesController");

router.get("/notes", getNotes);

router.post("/notes", createNote);

router.delete("/notes/:id", deleteNote);

module.exports = router;
