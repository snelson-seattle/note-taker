const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

router.get("/notes", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../../db/db.json"),
    "utf-8",
    (error, data) => {
      if (error) {
        res.status(500).json(error);
      } else {
        const notes = JSON.parse(data);
        res.status(200).json(notes);
      }
    }
  );
});

router.post("/notes", (req, res) => {
  if (!req.body.title || !req.body.text) {
    res
      .status(400)
      .json({
        message: "Request body must contain a 'title' and 'text' field",
      });
  } else {
    fs.readFile(
      path.join(__dirname, "../../db/db.json"),
      "utf-8",
      (error, data) => {
        if (error) {
          res.status(500).json(error);
        } else {
          const notes = JSON.parse(data);
          const { title, text } = req.body;
          const newNote = {
            id: uuid.v4(),
            title,
            text,
          };
          notes.push(newNote);
          fs.writeFile(
            path.join(__dirname, "../../db/db.json"),
            JSON.stringify(notes),
            (error, data) => {
              if (error) {
                res.status(500).json(error);
              } else {
                res.status(201).json(newNote);
              }
            }
          );
        }
      }
    );
  }
});

router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;

  if(!noteId) {
    res.status(400).json({message: "You must include a note id in the request"});
  }

  fs.readFile(path.join(__dirname, "../../db/db.json"), "utf-8", (error, data) => {
    if(error) {
      res.status(500).json(error);
    }else {
      const notes = JSON.parse(data);
      const newNotes = notes.filter(note => note.id !== noteId);
      fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(newNotes), (error, data) => {
        if(error) {
          res.status(500).json(error);
        }else {
          res.status(200).json({message: `Successfully deleted the note with id:${noteId}`});
        }
      })
    }
  })
});

module.exports = router;
