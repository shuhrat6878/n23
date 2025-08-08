import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
}, {
    timestamps: true,
    versionKey: false,
    virtuals: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

CategorySchema.virtual('productlar', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'categoryId'
});

const Category = model('Category', CategorySchema);
export default Category;
