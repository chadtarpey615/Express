const router = require("express").Router();
const fs = require("fs");
let notes;

// assign id to the new notes

function assignId() {
    let i;
    for (i = 0; i < notes.length; i++) {
        notes[i].id = i;
    }
    console.log(notes.length);
};



let savedNotes = fs.readFileSync("db/db.json", "UTF-8");
if (savedNotes) {
    let oldNotes = JSON.parse(savedNotes);
    notes = oldNotes
} else {
    notes = [];
};



router.get("/notes", function (req, res) {

    res.json(notes);
});


// post new notes

router.post("/notes", (req, res) => {

    let newPost = {
        title: req.body.title,
        text: req.body.text,
        id: assignId()

    };

    if (!newPost.title || !newPost.text) {
        return res.status(400).json({ msg: 'Please include a note' });
    };
    // push notes to db.json
    notes.push(newPost)
    fs.writeFile("db/db.json", JSON.stringify(notes, null, 2), function (err, data) {
        if (err) {
            throw err
        } else {
            res.send(data);
        }
    })
    console.log(newPost);
});


// delete notes via id

router.delete("/notes/:id", (req, res) => {

    const found = notes.some(notes => notes.id === parseInt(req.params.id));
    if (found) {
        res.json({ msg: "Note deleted", notes: notes.filter(notes => notes.id !== parseInt(req.params.id)) });
        notes.splice(req.params.id, 1);
        console.log(req.params.id);

    } else {
        res.status(400).json({ msg: `No notes with the id of ${req.params.id}` });
    }
})






module.exports = router;