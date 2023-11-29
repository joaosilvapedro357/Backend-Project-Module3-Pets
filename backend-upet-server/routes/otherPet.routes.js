/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Pet Routes */
const router = express.Router();

/* Require the Pet Model */
const OtherPet = require("../models/OtherPet.model.js");

/* ROUTES */

// POST '/api/pets' - Creates a new pet (OtherPet).
router.post("/api/pets", (req, res) => {
  const { name, image, age, breed, chipId, sex, weight,
    description, diet, medicalRecord } = req.body;

  OtherPet.create({ name, image, age, breed, chipId, sex, weight,
    description, diet, medicalRecord, owner: [] })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET '/api/pets' - Reads all pets (other than dogs or cats).
router.get("/api/pets", (req, res) => {
  OtherPet.find()
    .populate('owner')
    .then((allOtherPets) => res.json(allOtherPets))
    .catch((error) => res.json(error));
});

// GET '/api/pets/:otherPetId' - Reads a specific pet (other than dogs or cats).
router.get("/api/pets/:otherPetId", (req, res) => {
  const { otherPetId } = req.params;
  OtherPet.findById(otherPetId)
    .populate('owner')
    .then((pet) => res.json(pet))
    .catch((error) => res.json(error));
});

// PUT '/api/pets/:otherPetId' - Updates a specific pet (other than dogs or cats).
router.put("/api/pets/:otherPetId", (req, res) => {
  // Object destructuring
  const { otherPetId } = req.params;
  const { name, image, age, breed, chipId, sex, weight,
    description, diet, medicalRecord } = req.body;

  OtherPet.findByIdAndUpdate(otherPetId, { name, image, age, breed, chipId, sex, weight,
    description, diet, medicalRecord }, { new: true })
    .then(() => {
      res.json({ message: "Your pet info was Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update pet's info." });
    });
});

// DELETE '/api/pets/:otherPetId' - Deletes a specific pet (other than dogs or cats).
router.delete('/api/pets/:otherPetId', (req,res)=>{
    const {otherPetId} = req.params; 

    OtherPet.findByIdAndDelete(otherPetId)
        .then(()=>{
            res.json({message: 'Your pet was deleted.'});
        })
        .catch(()=>{
            res.json({error: 'Failed to delete pet.'});
        })
})

/* Export the router */
module.exports = router;