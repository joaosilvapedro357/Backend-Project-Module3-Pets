const mongoose = require('mongoose');
const {Schema, model} = mongoose; 

const adoptPetSchema = new Schema({
    name: { type: String, required: true },
    animal: { type: String, enum: ['Cat', 'Dog', 'otherPet' ], required: false },
    image: { type: String },
    age: { type: String, required: false },  /* Data type is String instead of Number 
    to cover the cases where animals are less than 1 year old (ex: 4 Months old) */
    breed: { type: String, required: false },
    chipId: { type: String, required: false, unique: true },  /* 
    Data type is String in case ID has not only numbers but letters too. */
    sex: { type: String, required: false },
    size: { type: String, enum: ['Small', 'Medium', 'Large' ], required: false },
    weight: { type: String, required: false },
    description: { type: String, required: true },
    diet: { type: String, required: false },
    medicalRecord: { type: String, required: false },
    healthStatus: { type: String, required: false},
    location: {type: String, required: false},
    associationName: {type: String, required: false},
});

module.exports = model("AdoptPet", adoptPetSchema);