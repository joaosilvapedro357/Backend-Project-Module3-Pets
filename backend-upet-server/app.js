// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
    
// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const dogRoutes = require('./routes/dog.routes');
app.use('/api', dogRoutes)

const catRoutes = require('./routes/cat.routes');
app.use('/api', catRoutes)

const otherPetRoutes = require('./routes/otherPet.routes');
app.use('/api', otherPetRoutes)

const adoptPetRoutes = require("./routes/adoptPet.routes");
app.use("/api", adoptPetRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;


