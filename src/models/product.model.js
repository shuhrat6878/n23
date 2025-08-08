import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    color: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    sallerId: { type: Schema.Types.ObjectId, ref: 'Saller' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true, versionKey: false });

const 
Product = model('Product', ProductSchema);
export default Product;