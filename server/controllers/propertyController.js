const Property = require("../models/PropertyModel.js");
const uploadImage = require("../utils/avatar");
const { image } = require("../utils/cloudinary.js");
const user = require("../models/UserModel.js");

const PropertyUpload = async (req, res, next) => {
  try {
    const imageUrls = [];

    for (const file of req.files) {
      const result = await uploadImage(file.path);
      imageUrls.push(result.url);
    }

    const newProperty = new Property({
      ...req.body,
      images_list: imageUrls,
      userRef: req.user?.id,
    });

    await newProperty.save();

    res.status(200).json({
      success: true,
      message: "Property added successfully",
      data: newProperty,
    });
  } catch (err) {
    next(err);
  }
};

const getingProperties = async (req, res, next) => {
  try {
    const { search, type, offer, parking, furnished, sort, limit } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (type && type !== "all") {
      query.type = type;
    }

    if (offer === "true") query.offer = true;
    if (parking === "true") query.parking = true;
    if (furnished === "true") query.furnished = true;

    let properties = Property.find(query);

    if (sort === "low") {
      properties = properties.sort({ price: 1 });
    } else if (sort === "high") {
      properties = properties.sort({ price: -1 });
    } else if (sort === "oldest") {
      properties = properties.sort({ createdAt: 1 });
    } else {
      properties = properties.sort({ createdAt: -1 });
    }

    if (limit) {
      properties = properties.limit(Number(limit));
    }

    const result = await properties;

    res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getThePropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (err) {
    next(err);
  }
};

const getMyProperties = async (req, res, next) => {
  try {
    const id = req.user.id;

    const myProperties = await Property.find({ userRef: id });

    res.status(200).json({
      success: true,
      data: myProperties,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProperty = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteProperty = await Property.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  PropertyUpload,
  getingProperties,
  getThePropertyById,
  getMyProperties,
  deleteProperty,
};
