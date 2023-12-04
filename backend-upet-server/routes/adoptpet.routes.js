/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Adopt Pet Routes */
const router = express.Router();

/* Require the AdoptPet Model */
const AdoptPet = require("../models/AdoptPet.model");

/* ROUTES */

// POST '/api/adoptpet' - Creates a new pet to adopt
router.post("/adoptpet", (req, res) => {
  const { name, animal, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord, healthStatus, location, associationName } = req.body;

  AdoptPet.create({name, animal, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord, healthStatus, location, associationName })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET '/adoptpets' - Reads all pets to adopt
router.get("/adoptpets", (req, res) => {
  AdoptPet.find()
    //.populate('owner') Pets to adopt don't have a owner yet
    .then((allPetsToAdopt) => res.json(allPetsToAdopt))
    .catch((error) => res.json(error));
});

// GET 'adoptpets/:adoptpetId' - Reads a specific pet to adopt
router.get("/adoptpets/:adoptpetId", (req, res) => {
  const { adoptpetId } = req.params;
  AdoptPet.findById(adoptpetId)
    //.populate('owner') Pets to adopt don't have a owner yet
    .then((petToAdopt) => res.json(petToAdopt))
    .catch((error) => res.json(error));
});

// PUT '/adoptpets/:adoptpetId' - Updates a specific pet to adopt
router.put("/adoptpets/:adoptpetId", (req, res) => {
  // Object destructuring
  const { adoptpetId } = req.params;
  const { name, animal, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord, healthStatus, location, associationName } = req.body;

  AdoptPet.findByIdAndUpdate(adoptpetId, { name, animal, image, age, breed, 
    chipId, sex, size, weight, description, diet, medicalRecord, healthStatus, 
    location, associationName }, { new: true })
    .then(() => {
      res.json({ message: "Your pet for adoption info was Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update pet for adoption info." });
    });
});

// DELETE '/adoptpets/:adoptpetId' - Deletes a specific pet for adoption
router.delete('/adoptpets/:adoptpetId', (req,res)=>{
    const {adoptpetId} = req.params; 

    AdoptPet.findByIdAndDelete(adoptpetId)
        .then(()=>{
            res.json({message: 'Your pet for adoption was deleted.'});
        })
        .catch(()=>{
            res.json({error: 'Failed to delete your pet for adoption.'});
        })
})

/* Export the router */
module.exports = router;