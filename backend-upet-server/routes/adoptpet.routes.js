/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Pet for Adoption Routes */
const router = express.Router();

/* Require the AdoptPet Model */
const AdoptPet = require("../models/AdoptPet.model");

/* ROUTES */

// POST '/api/petforadoption' - Creates a new pet for adoption
router.post("/petforadoption", (req, res) => {
  const { name, animal, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord, healthStatus, location, associationName } = req.body;

  AdoptPet.create({name, animal, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord, healthStatus, location, associationName })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET '/petsforadoption' - Reads all pets for adoption
router.get("/petsforadoption", (req, res) => {
  AdoptPet.find()
    //.populate('owner') Pets for adoption don't have a owner yet
    .then((allPetsForAdoption) => res.json(allPetsForAdoption))
    .catch((error) => res.json(error));
});

// GET 'petsforadoption/:petId' - Reads a specific pet for adoption
router.get("/petsforadoption/:petId", (req, res) => {
  const { petId } = req.params;
  AdoptPet.findById(petId)
    //.populate('owner') Pets to adopt don't have a owner yet
    .then((petForAdoption) => res.json(petForAdoption))
    .catch((error) => res.json(error));
});

// PUT '/petsforadoption/:petId' - Updates a specific pet for adoption
router.put("/petsforadoption/:petId", (req, res) => {
  // Object destructuring
  const { petId } = req.params;
  const { name, animal, image, age, breed, chipId, sex, size, weight,
    description, diet, medicalRecord, healthStatus, location, associationName } = req.body;

  AdoptPet.findByIdAndUpdate(petId, { name, animal, image, age, breed, 
    chipId, sex, size, weight, description, diet, medicalRecord, healthStatus, 
    location, associationName }, { new: true })
    .then(() => {
      res.json({ message: "Your pet for adoption info was Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update pet for adoption info." });
    });
});

// DELETE '/petsforadoption/:petId' - Deletes a specific pet for adoption
router.delete('/petsforadoption/:petId', (req,res)=>{
    const {petId} = req.params; 

    AdoptPet.findByIdAndDelete(petId)
        .then(()=>{
            res.json({message: 'Your pet for adoption was deleted.'});
        })
        .catch(()=>{
            res.json({error: 'Failed to delete your pet for adoption.'});
        })
})

/* Export the router */
module.exports = router;