import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
    Name: { type: String, required: true },
    Category: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Price: { type: Number, required: true },
}, {
    timestamps: true,
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);


export default Item;


