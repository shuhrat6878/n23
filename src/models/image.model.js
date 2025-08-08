import { Schema, model } from "mongoose";

const ImageSchema = new Schema({
    title: { type: String, required: true },
    imageUri: { type: String },
    fileName: { type: String },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
}, { timestamps: true, versionKey: false });

const Image = model('Image', ImageSchema);
export default Image;
