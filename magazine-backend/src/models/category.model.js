import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type : String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const Category = mongoose.model("Category", CategorySchema);
export default Category;