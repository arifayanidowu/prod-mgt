const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    address: {
      type: String,
      required: [true, "Product address is required"],
    },
    details: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    image: String,
  },
  { timestamps: true }
);

//Geocode and create location
ProductSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  next();
});

ProductSchema.index({ location: "2dsphere" });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
