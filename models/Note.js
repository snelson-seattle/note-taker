const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String, 
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Note", NoteSchema);