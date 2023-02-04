const Note = require("../models/Note");
const ERROR_MESSAGE = "Something went wrong.";

// @desc Gets all notes
// @route GET /api/notes
const getNotes = async (req, res) => {
  try {
    // Query MongoDB database for notes, then return them
    // the .lean() method will just return the json data
    // rather than making each note a mongoose document
    // object that contains its own methods
    const notes = await Note.find().lean();
    if (!notes) {
      return res.status(400).json({ message: "No users were found." });
    }
    res.json(notes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

// @desc Creates a new note
// @route POST /api/notes
const createNote = async (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({
      message:
        "You must provide a 'title' and 'text' field in the request body.",
    });
  }

  try {
    const duplicateNote = await Note.findOne({ title, text }).lean().exec();
    if (duplicateNote) {
      return res.status(409).json({ message: "Note already exists." });
    }

    const newNote = {
      title,
      text,
    };

    const note = await Note.create(newNote);

    if (note) {
      res.status(201).json(note);
    } else {
      res.status(400).json({ message: "Invalid note data received." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

// @desc Deletes a specific note
// @route DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  if (!noteId) {
    return res
      .status(400)
      .json({ message: "A note id is required in order to delete a note." });
  }

  try {
    const note = await Note.findById(noteId).exec();
    if (!note) {
      return res.status(404).json({ message: "No notes found with given id." });
    }

    const result = await note.deleteOne();

    const reply = `Note with ID: ${result._id} was deleted`;

    res.json(reply);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

module.exports = {
  getNotes,
  createNote,
  deleteNote,
};
