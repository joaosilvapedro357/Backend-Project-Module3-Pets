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
    description, diet, medicalRecord, user } = req.body;

  Pet.create({ name, image, age, breed, hairType, chipId, sex, size, weight,
    description, diet, medicalRecord, user: userId})
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET '/api/:userId/pets' - Reads all pets for the User
router.get("/:userId/pets", (req, res) => {
  const {userId} = req.params;
  Pet.find({user: userId})
    .populate('owner')
    .then((allPetsForUser) => res.json(allPetsForUser))
    .catch((error) => res.json(error));
});

// GET '/api/pets/:petId' - Reads a specific pet for the User
router.get("/pets/:petId", (req, res) => {
  const { petId } = req.params;
  Pet.findById(petId)
    .populate("owner")
    .then((petForUser) => res.json(petForUser))
    .catch((error) => res.json(error));
});

// PUT '/:userId/pets/:petId' - Updates a specific pet of the User
router.put("/pets/:petId", (req, res) => {
  // Object destructuring
  const { userId } = req.params;
  const { name, image, age, breed, hairType, chipId, sex, size, weight,
    description, diet, medicalRecord, user} = req.body;

  Pet.findByIdAndUpdate({user: userId}, petId, { name, image, age, breed, hairType, chipId, 
    sex, size, weight, description, diet, medicalRecord, user: userId }, { new: true })
    .then(() => {
      res.json({ message: "User's pet info was Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update User's pet info." });
    });
});

// DELETE '/:userIdpets/:petId' - Deletes a specific pet of the User
router.delete('/pets/:petId', (req,res)=>{

    const {userId} = req.params; 

    Pet.findByIdAndDelete({user: userId},petId)
        .then(()=>{
            res.json({message: `User's pet was deleted.`});
        })
        .catch(()=>{
            res.json({error: `Failed to delete User's pet.`});
        })
})

/* Export the router */
module.exports = router;
