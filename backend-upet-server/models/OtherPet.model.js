const mongoose = require('mongoose');
const {Schema, model} = mongoose; 

const otherPetSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    age: { type: String, required: true }, // Data type is String isntead of Number to cover the cases where animals areless than 1 year old (ex: 4 Months old)
    breed: { type: String },
    chipId: { type: String, unique: true }, // Data type is String in case ID has not only numbers but letteres too.
    sex: { type: String, required: true },
    weight: { type: String },
    description: { type: String, required: true },
    diet: { type: String },
    medicalRecord: { type: String, required: true },
    owner: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = model("OtherPet", otherPetSchema);