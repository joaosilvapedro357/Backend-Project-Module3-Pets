const mongoose = require('mongoose');
const {Schema, model} = mongoose; 

const dogSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    age: { type: String, required: true }, // Data type is String isntead of Number to cover the cases where animals areless than 1 year old (ex: 4 Months old)
    breed: { type: String, required: true },
    hairType: { type: String },
    chipId: { type: String, required: true, unique: true }, // Data type is String in case ID has not only numbers but letteres too.
    sex: { type: String, required: true },
    size: { type: String, enum: ['Small', 'Medium', 'Large' ], required: true },
    weight: { type: String, required: true },
    description: { type: String, required: true },
    diet: { type: String, required: true },
    medicalRecord: { type: String, required: true },
    owner: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = model("Dog", dogSchema);