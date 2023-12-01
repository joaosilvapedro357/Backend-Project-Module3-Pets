const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: { type: String, required: [true, "Email is required."], unique: true, 
    lowercase: true, trim: true },
    password: { type: String, required: [true, "Password is required."] },
    name: { type: String, required: [true, "Name is required."] },
    phoneNumber: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    numberOfPets: { type: Number }
    
  }
  /*{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }*/
);

const User = model("User", userSchema);

module.exports = User;
