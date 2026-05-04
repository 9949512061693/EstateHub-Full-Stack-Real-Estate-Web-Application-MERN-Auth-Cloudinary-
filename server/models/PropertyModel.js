const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide Title"],
    },
    description: {
      type: String,
      required: [true, "Please Provide description"],
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    area: {
      type: Number,
      required: true,
    },
    images_list: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

const PropertyModel = mongoose.model("Property", PropertySchema);

module.exports = PropertyModel;
