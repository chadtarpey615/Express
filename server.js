const express = require("express");
const apiRoutes = require("./routes/apiRoutes")
const htmlRoutes = require("./routes/htmlRoutes");
const app = express();

// create port
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);






// making the port avtive
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});





