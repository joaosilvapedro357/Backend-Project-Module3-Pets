const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: { type: String, required: [true, "Email is required."], unique: true, 
    lowercase: true, trim: true },
    password: { type: String, required: [true, "Password is required."] },
    name: { type: String, required: false},
    phoneNumber: { type: String},
    country: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    numberOfPets: { type: Number }
  }
  /*{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }*/
);

const User = model("User", userSchema);

module.exports = User;
