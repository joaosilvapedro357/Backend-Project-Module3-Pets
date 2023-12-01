const mongoose = require('mongoose');
const {Schema, model} = mongoose; 

const adoptPetSchema = new Schema({
    name: { type: String, required: true },
    animal: { type: String, enum: ['Cat', 'Dog', 'otherPet' ], required: true },
    image: { type: String },
    age: { type: String, required: true },  /* Data type is String instead of Number 
    to cover the cases where animals are less than 1 year old (ex: 4 Months old) */
    breed: { type: String, required: true },
    chipId: { type: String, required: true, unique: true },  /* 
    Data type is String in case ID has not only numbers but letters too. */
    sex: { type: String, required: true },
    size: { type: String, enum: ['Small', 'Medium', 'Large' ], required: true },
    weight: { type: String, required: true },
    description: { type: String, required: true },
    diet: { type: String, required: true },
    medicalRecord: { type: String, required: true },
    healthStatus: { type: String, required: true},
    location: {type: String, required: true},
    associationName: {type: String, required: true},
});

module.exports = model("Cat", adoptPetSchema);