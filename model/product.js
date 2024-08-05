const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const product = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: { type: String },
    price: { type: Number },
    rate: { type: Number },
    image: { type: String },
    description: { type: String },
    quantity: { type: Number },
    role: { type: String },
    category: { type: ObjectId, ref: 'category' },
});
module.exports = mongoose.models.product || mongoose.model('product', product);