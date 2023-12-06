const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const adminSchema = new Schema(
  {
    email: { type: String, required: [true, "Email is required."], unique: true, 
    lowercase: true, trim: true },
    password: { type: String, required: [true, "Password is required."] },
    name: { type: String, required: false},
  }
  /*{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }*/
);

const Admin = model("Admin", adminSchema);

module.exports = Admin;