const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = process.env.PORT || 4200;
require('dotenv').config();
const app = express();
app.use(cors());
const dbHost = process.env.DB_HOST;
mongoose.connect(`${dbHost}`, { useNewUrlParser: true });

const keeperSchema = new mongoose.Schema({
    Name: String,
    Content: [{
        title: String,
        desc: String
    }],

});

const Keeper = mongoose.model("Keeper", keeperSchema);

// const item = new Keeper({
//     Name: "abc",
//     Content:
//         [{
//             title: "Harshasad",
//             desc: "Testinasdg Please Work"
//         }]


// })

// const newItem = {
//     title: "New Title",
//     desc: "New Description"
// };

// item.Content.push(newItem);

// item.save();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/:user", async function (req, res) {
    const items = await Keeper.find({ Name: req.params.user });
    res.send(items);
})

app.post("/add/:user", function (req, res) {
    const newItem = {
        title: req.body.title,
        desc: req.body.desc
    };

    // Check if the user already exists based on Name field
    Keeper.findOne({ Name: req.params.user })
        .exec()
        .then(keeper => {
            if (keeper) {
                // If user found, push the newItem into Content array
                keeper.Content.push(newItem);
                return keeper.save();
            } else {
                // If user not found, create a new document with Name and Content
                const newKeeper = new Keeper({
                    Name: req.params.user,
                    Content: [newItem]
                });
                return newKeeper.save();
            }
        })
        .then(savedKeeper => {
            res.json(savedKeeper);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
});

app.delete("/del/:title", function (req, res) {
    const titleToDelete = req.params.title;
    const nameToDelete = req.body.name;

    Keeper.findOneAndUpdate(
        { Name: nameToDelete },
        { $pull: { Content: { title: titleToDelete } } },
        { new: true }
    )
        .then(result => {
            console.log(result);
            res.send("SUCCESS");
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Error occurred while deleting content");
        });
});


app.listen(PORT, function () {
    console.log("Server started on port 4200");
});
