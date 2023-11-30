/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Cat Routes */
const router = express.Router();

/* Require the Cat Model */
const Cat = require("../models/Cat.model.js");

/* ROUTES */

// POST '/api/cat' - Creates a new Cat.
router.post("/cat", (req, res) => {
  const { name, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord } = req.body;

  Cat.create({ name, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord, owner: [] })
    .then((response) => res.json(response))
    .catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

// GET 'pets' - Reads all cats
router.get("/cats", (req, res) => {
  Cat.find()
    .populate("owner")
    .then((allCats) => res.json(allCats))
    .catch((error) => res.json(error));
});

// GET 'pets/:catId' - Reads a specific cat.
router.get("/cats/:catId", (req, res) => {
  const { catId } = req.params;
  Cat.findById(catId)
    .populate('owner')
    .then((cat) => res.json(cat))
    .catch((error) => res.json(error));
});

// PUT 'pets/:catId' - Updates a specific cat.
router.put("/cats/:catId", (req, res) => {
  // Object destructuring
  const { catId } = req.params;
  const { name, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord } = req.body;

  Cat.findByIdAndUpdate(catId, { name, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord }, { new: true })
    .then(() => {
      res.json({ message: "Your cat info was Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update cat's info." });
    });
});

// DELETE 'pets/:catId' - Deletes a specific cat 
router.delete('/cats/:catId', (req,res)=>{
    const {catId} = req.params; 

    Cat.findByIdAndDelete(catId)
        .then(()=>{
            res.json({message: 'Your pet cat was deleted.'});
        })
        .catch(()=>{
            res.json({error: 'Failed to delete pet cat.'});
        })
})

/* Export the router */
module.exports = router;