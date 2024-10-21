const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    shortUrl: {type: String, required: true},
    originalUrl: {type: String, required: true},
    urlCode: {type: String, required: true},

},
 {timestamps: true}
);

const url = mongoose.model("url", urlSchema);

module.exports = url