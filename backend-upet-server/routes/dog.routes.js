/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Dog Routes */
const router = express.Router();

/* Require the Dog Model */
const Dog = require("../models/Dog.model.js");

/* ROUTES */

// POST '/api/pets' - Creates a new pet (Dog).
router.post("/api/pets", (req, res) => {
  const { name, image, age, breed, hairType, chipId, sex, size, weight,
    description, diet, medicalRecord } = req.body;

  Dog.create({ name, image, age, breed, hairType, chipId, sex, size, weight,
    description, diet, medicalRecord, owner: [] })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET '/api/projects' - Reads all dogs.
router.get("/api/pets", (req, res) => {
  Dog.find()
    .populate('owner')
    .then((allDogs) => res.json(allDogs))
    .catch((error) => res.json(error));
});

// GET '/api/pets/:dogId' - Reads a specific dog.
router.get("/api/pets/:dogId", (req, res) => {
  const { dogId } = req.params;
  Dog.findById(dogId)
    .populate('owner')
    .then((dog) => res.json(dog))
    .catch((error) => res.json(error));
});

// PUT '/api/pets/:dogId' - Updates a specific dog.
router.put("/api/pets/:dogId", (req, res) => {
  // Object destructuring
  const { dogId } = req.params;
  const { name, image, age, breed, hairType, chipId, sex, size, weight,
    description, diet, medicalRecord } = req.body;

  Dog.findByIdAndUpdate(dogId, { name, image, age, breed, hairType, chipId, sex, size, weight,
    description, diet, medicalRecord }, { new: true })
    .then(() => {
      res.json({ message: "Your dog info was Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update dog's info." });
    });
});

// DELETE '/api/pets/:dogId' - Deletes a specific dog pet.
router.delete('/api/pets/:dogId', (req,res)=>{
    const {dogId} = req.params; 

    Dog.findByIdAndDelete(dogId)
        .then(()=>{
            res.json({message: 'Your pet dog was deleted.'});
        })
        .catch(()=>{
            res.json({error: 'Failed to delete pet dog.'});
        })
})

/* Export the router */
module.exports = router;
