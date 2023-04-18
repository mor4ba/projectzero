import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  //created: new Date(),
  location: { type: String, required: true },
  //image: { type: String, required: false },
  //mapURL: { type: String, required: true },
  comment: [{ type: String, required: true }],
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
