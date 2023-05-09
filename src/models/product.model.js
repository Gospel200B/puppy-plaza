const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add the name of the product"]
    },

    decription: {
      type: String,
      required: [true, "Add a brief description of the product"],
      maxlength: [200, "Description entered should not exceed 200 characters"]
    },
    image: {
      type: String,
      default: "",
    },

    images: {
      type: String,
    },

    price: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      required: [true, "Size must be a number"]
    },
    height: {
      type: String,
      Default: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 300,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

exports.Product = mongoose.model("Product", productSchema);
