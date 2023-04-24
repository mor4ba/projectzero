import mongoose from "mongoose";
import { comment } from "postcss";

const { Schema } = mongoose;

const commentSchema = new Schema({
  body: { type: String, required: true },
  date: { type: String, required: true },
});

const placeSchema = new Schema({
  name: { type: String, required: true },
  //created: new Date(),
  location: { type: String, required: true },
  latitude: { type: Number, required: false },
  inModeration: { type: Boolean, required: true },
  longitude: { type: Number, required: false },
  //image: { type: String, required: false },
  //mapURL: { type: String, required: true },
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
