/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Adopt Pet Routes */
const router = express.Router();

/* Require the AdoptPet Model */
const AdoptedPet = require("../models/AdoptPet.model");

/* ROUTES */

// POST '/api/adoptedpet' - Creates a new adoptedpet
router.post("/adoptedpet", (req, res) => {
  const { name, animal, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord, healthStatus, location, associationName } = req.body;

  AdoptPet.create({name, animal, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord, healthStatus, location, associationName })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET '/adoptedpets' - Reads all adopted pets
router.get("/adoptedpets", (req, res) => {
  AdoptPet.find()
    .populate('owner')
    .then((allAdoptedPets) => res.json(allAdoptedPets))
    .catch((error) => res.json(error));
});

// GET 'adoptedpets/:adoptedpetId' - Reads a specific adopted pet
router.get("/adoptedpets/:adoptedpetId", (req, res) => {
  const { adoptedpetId } = req.params;
  Dog.findById(adoptedpetId)
    .populate('owner')
    .then((adoptedPet) => res.json(adoptedPet))
    .catch((error) => res.json(error));
});

// PUT '/adoptedpets/:adoptedpetId' - Updates a specific adopted pet
router.put("/adoptedpets/:adoptedpetId", (req, res) => {
  // Object destructuring
  const { adoptedpetId } = req.params;
  const { name, animal, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord, healthStatus, location, associationName } = req.body;

  AdoptPet.findByIdAndUpdate(adoptedpetId, { name, animal, image, age, breed, 
    chipId, sex, size, weight, description, diet, medicalRecord, healthStatus, 
    location, associationName }, { new: true })
    .then(() => {
      res.json({ message: "Your adopted pet info was Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update Adopted pet info." });
    });
});

// DELETE '/adoptedpets/:adoptedpetId' - Deletes a specific adopted pet
router.delete('/adoptedpets/:adoptedpetId', (req,res)=>{
    const {adoptedpetId} = req.params; 

    AdoptPet.findByIdAndDelete(adoptedpetId)
        .then(()=>{
            res.json({message: 'Your adopted pet was deleted.'});
        })
        .catch(()=>{
            res.json({error: 'Failed to delete adopted pet.'});
        })
})

/* Export the router */
module.exports = router;