import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    quantity: { type: Number, required: true },
    totalPrice: { type: Number },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
}, { timestamps: true, versionKey: false });

const order = model('Order', OrderSchema);
export default order;
