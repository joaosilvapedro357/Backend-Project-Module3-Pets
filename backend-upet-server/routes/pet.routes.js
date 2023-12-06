/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Pet Routes */
const router = express.Router();

/* Require the Pet Model */
const Pet = require("../models/Pet.model");

/* ROUTES */

// POST '/:userId/pet' - Creates a new Pet for the User
router.post("/:userId/pet", (req, res) => {
  const {userId} = req.params;
  const { name, image, age, breed, hairType, chipId, sex, size, weight,
    description, diet, medicalRecord } = req.body;

  Pet.create({ name, image, age, breed, hairType, chipId, sex, size, weight,
    description, diet, medicalRecord, user: userId})
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET '/:userId/pets' - Reads all pets for the User
router.get("/:userId/pets", (req, res) => {
  Pet.find()
    .populate('owner')
    .then((allPets) => res.json(allPets))
    .catch((error) => res.json(error));
});

// GET '/pets/:petId' - Reads a specific pet
router.get("/pets/:petId", (req, res) => {
  const { petId } = req.params;
  Pet.findById(petId)
    .populate("owner")
    .then((pet) => res.json(pet))
    .catch((error) => res.json(error));
});

// PUT '/pets/:petId' - Updates a specific pet
router.put("/pets/:petId", (req, res) => {
  // Object destructuring
  const { petId } = req.params;
  const { name, image, age, breed, hairType, chipId, sex, size, weight,
    description, diet, medicalRecord } = req.body;

  Pet.findByIdAndUpdate(petId, { name, image, age, breed, hairType, chipId, 
    sex, size, weight, description, diet, medicalRecord }, { new: true })
    .then(() => {
      res.json({ message: "Your pet info was Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update pet's info." });
    });
});

// DELETE 'pets/:petId' - Deletes a specific pet
router.delete('/pets/:petId', (req,res)=>{

    const {petId} = req.params; 

    Pet.findByIdAndDelete(petId)
        .then(()=>{
            res.json({message: 'Your pet was deleted.'});
        })
        .catch(()=>{
            res.json({error: 'Failed to delete pet.'});
        })
})

/* Export the router */
module.exports = router;
