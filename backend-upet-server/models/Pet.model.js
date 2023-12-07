const mongoose = require('mongoose');
const {Schema, model} = mongoose; 

const petSchema = new Schema({ // Show required fields in front-end form with an astericus
    name: { type: String, required: true },
    image: { type: String },
    age: { type: String, required: true }, /*  Data type is String isntead of 
    Number to cover the cases where animals are less than 1 year old (ex: 4 Months old) */
    breed: { type: String, required: false }, 
    hairType: { type: String },
    chipId: { type: String, required: false, unique: true }, /* 
    Data type is String in case ID has not only numbers but letters too. */
    sex: { type: String, required: true }, 
    size: { type: String, enum: ['Small', 'Medium', 'Large' ], required: false },
    weight: { type: String, required: true },
    description: { type: String, required: true },
    diet: { type: String, required: true },
    medicalRecord: { type: String, required: true },
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    user: {type: String}
});

module.exports = model("Pet", petSchema);