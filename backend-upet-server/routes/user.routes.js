/* Require NPM Packages */
const express = require("express");
const mongoose = require("mongoose");

/* Configure an Express Router for the Pet Routes */
const router = express.Router();

/* Require the Pet Model */
const User = require("../models/User.model");


/* ROUTES */

// POST '/user' - Creates a new User
router.post("/user", (req, res) => {
  const { email, password, name, phoneNumber, country, city, address, numberOfPets } = req.body;

  User.create({ email, password, name, phoneNumber, country, city, address, numberOfPets})
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

// GET '/users' - Reads all Users
router.get("/users", (req, res) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((error) => res.json(error));
});

// GET '/users/:userId' - Reads a specific User
router.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((User) => res.json(User))
    .catch((error) => res.json(error));
});

// PUT '/users/:userId' - Updates a specific User
router.put("/users/:userId", (req, res) => {
  // Object destructuring
  const { userId } = req.params;
  const { email, password, name, phoneNumber, country, city, address, numberOfPets } = req.body;

  User.findByIdAndUpdate(userId, { email, password, name, phoneNumber, country, city, 
    address, numberOfPets }, { new: true })
    .then(() => {
      res.json({ message: "Your user info was Updated!" });
    })
    .catch((error) => {
      res.json({ message: "Failed to Update user's info." });
    });
});

// DELETE '/users/:userId' - Deletes a specific User
router.delete('/users/:userId', (req,res)=>{

    const {userId} = req.params; 

    User.findByIdAndDelete(userId)
        .then(()=>{
            res.json({message: 'Your User was deleted.'});
        })
        .catch(()=>{
            res.json({error: 'Failed to delete User.'});
        })
})

/* Export the router */
module.exports = router;
