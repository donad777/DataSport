const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const category = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: { type: String },
    image: { type: String },
});
module.exports = mongoose.models.category || mongoose.model('category', category);