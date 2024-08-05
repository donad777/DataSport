const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const new1 = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: { type: String },
    image: { type: String },
});
module.exports = mongoose.models.new1 || mongoose.model('new1', new1);