import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  body: { type: String, required: true },
  date: { type: String, required: true },
  likedBy: [{ type: String, required: true }],
});

const imageSchema = new Schema({
  inModeration: { type: Boolean, required: false, default: true },
  url: { type: String, required: false },
});

const placeSchema = new Schema({
  name: { type: String, required: true },
  features: [{ type: String, required: true, default: "" }],
  images: [{ type: imageSchema, default: "" }],
  location: { type: String, required: true },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  typeOf: { type: String, required: true },
  inModeration: { type: Boolean, default: true },
  count: { type: Number, default: 0 },
  ratedBy: [{ type: String, required: true, default: "" }],
  comment: [commentSchema],
  r_dresscode: [{ type: Number, required: true }],
  r_amountOfPeople: [{ type: Number, required: true }],
  r_volume: [{ type: Number, required: true }],
  r_isSmoking: [{ type: Number, required: true }],
  r_temperature: [{ type: Number, required: true }],
  r_lights: [{ type: Number, required: true }],
  r_cringe: [{ type: Number, required: true }],
  r_age: [{ type: Number, required: true }],
  r_staff: [{ type: Number, required: true }],
  r_prices: [{ type: Number, required: true }],
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
