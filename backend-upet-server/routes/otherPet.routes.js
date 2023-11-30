/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Pet Routes */
const router = express.Router();

/* Require the Pet Model */
const OtherPet = require("../models/OtherPet.model.js");

/* ROUTES */

// POST 'pet' - Creates a new Otherpet
router.post("/otherpet", (req, res) => {
  const { name, image, age, breed, chipId, sex, weight,
    description, diet, medicalRecord } = req.body;

  OtherPet.create({ name, image, age, breed, chipId, sex, weight,
    description, diet, medicalRecord, owner: [] })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET 'pets' - Reads all otherPets
router.get("/otherpets", (req, res) => {
  OtherPet.find()
    .populate("owner")
    .then((allOtherPets) => res.json(allOtherPets))
    .catch((error) => res.json(error));
});

// GET 'pets/:otherPetId' - Reads a specific otherPet
router.get("/otherpets/:otherPetId", (req, res) => {
  const { otherPetId } = req.params;
  OtherPet.findById(otherPetId)
    .populate('owner')
    .then((pet) => res.json(pet))
    .catch((error) => res.json(error));
});

// PUT 'pets/:otherPetId' - Updates a specific otherPet
router.put("/otherpets/:otherPetId", (req, res) => {
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

// DELETE 'pets/:otherPetId' - Deletes a specific otherPet
router.delete('/otherpets/:otherPetId', (req,res)=>{
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